import { decode, encode } from "@ethereumjs/rlp";
import { Trie } from "@ethereumjs/trie";
import { ethers } from "ethers";
import { canonicalBytes } from "./canonicalize";
import { bytesToHex, hexToBytes, sha256Hex } from "./crypto";
import type { BatchCheckpointV1, Hex32, SettlementEvidenceV1, VerifierPolicy } from "./types";

type RlpValue = Uint8Array | RlpValue[];

const CHECKPOINT_SUBMITTED_EVENT =
  "event CheckpointSubmitted(bytes32 indexed checkpointHash,bytes32 contractCheckpointFieldsHash,uint64 indexed epochStartMs,bytes32 indexed shard,bytes32 eventRoot,address submitter)";
const CHECKPOINT_INTERFACE = new ethers.Interface([CHECKPOINT_SUBMITTED_EVENT]);
const CHECKPOINT_TOPIC = ethers.id("CheckpointSubmitted(bytes32,bytes32,uint64,bytes32,bytes32,address)").toLowerCase();

function toHex(bytes: Uint8Array): string {
  return bytesToHex(bytes).toLowerCase();
}

function hexEq(left: string | undefined, right: string | undefined): boolean {
  return Boolean(left && right && left.toLowerCase() === right.toLowerCase());
}

function checkpointShardEventValue(shard: string): string {
  const normalized = shard.startsWith("0x") ? shard : `0x${shard}`;
  return /^0x[0-9a-fA-F]{1,64}$/.test(normalized) ? ethers.zeroPadValue(normalized, 32) : ethers.id(shard);
}

function withoutUndefined<T>(value: T): T {
  if (Array.isArray(value)) return value.map((entry) => withoutUndefined(entry)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, entry]) => entry !== undefined)
        .map(([key, entry]) => [key, withoutUndefined(entry)])
    ) as T;
  }
  return value;
}

function asList(value: RlpValue): RlpValue[] {
  if (!Array.isArray(value)) throw new Error("RLP_EXPECTED_LIST");
  return value;
}

function asBytes(value: RlpValue): Uint8Array {
  if (Array.isArray(value)) throw new Error("RLP_EXPECTED_BYTES");
  return value;
}

function rlpToNumber(value: RlpValue): number {
  const bytes = asBytes(value);
  if (bytes.length === 0) return 0;
  const n = BigInt(toHex(bytes));
  if (n > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error("RLP_NUMBER_UNSAFE");
  return Number(n);
}

function decodeReceiptPayload(receiptBytes: Uint8Array): RlpValue[] {
  const typed = receiptBytes[0] !== undefined && receiptBytes[0] < 0xc0;
  return asList(decode(typed ? receiptBytes.slice(1) : receiptBytes) as RlpValue);
}

function receiptLogs(receiptBytes: Uint8Array): RlpValue[] {
  const payload = decodeReceiptPayload(receiptBytes);
  return asList(payload[3]);
}

function blockHeaderFields(blockHeaderRlp: string): RlpValue[] {
  const fields = asList(decode(hexToBytes(blockHeaderRlp)) as RlpValue);
  if (fields.length < 9) throw new Error("BLOCK_HEADER_INVALID");
  return fields;
}

function receiptRootFromHeader(blockHeaderRlp: string): Hex32 {
  return toHex(asBytes(blockHeaderFields(blockHeaderRlp)[5])) as Hex32;
}

function blockNumberFromHeader(blockHeaderRlp: string): number {
  return rlpToNumber(blockHeaderFields(blockHeaderRlp)[8]);
}

function finalitySourceCommitment(evidence: SettlementEvidenceV1): Hex32 | undefined {
  if (!evidence.finality_proof) return undefined;
  return sha256Hex(
    canonicalBytes(withoutUndefined({
      type: evidence.finality_proof.type,
      chain_id: evidence.chain_id,
      block_hash: evidence.block_hash,
      block_number: evidence.block_number,
      finalized_block_hash: evidence.finality_proof.finalized_block_hash,
      confirmations: evidence.finality_proof.confirmations
    }))
  );
}

function receiptProofSourceCommitment(evidence: SettlementEvidenceV1): Hex32 | undefined {
  if (!evidence.block_header_rlp || !evidence.receipt_rlp || !evidence.receipt_proof_nodes || evidence.transaction_index === undefined) return undefined;
  return sha256Hex(
    canonicalBytes(withoutUndefined({
      block_header_rlp: evidence.block_header_rlp,
      receipt_rlp: evidence.receipt_rlp,
      receipt_proof_nodes: evidence.receipt_proof_nodes,
      receipt_root: evidence.receipt_root,
      transaction_index: evidence.transaction_index,
      log_index: evidence.log_index,
      finality_proof: evidence.finality_proof
    }))
  );
}

function chainProofCommitment(evidence: SettlementEvidenceV1): Hex32 {
  return sha256Hex(
    canonicalBytes({
      settlement_event_hash: evidence.settlement_event_hash,
      receipt_proof_source_commitment: evidence.receipt_proof_source_commitment,
      finality_source_commitment: evidence.finality_source_commitment
    })
  );
}

function offlineSettlementEventHash(evidence: SettlementEvidenceV1): Hex32 | undefined {
  if (!evidence.event_topics?.length || !evidence.event_data) return undefined;
  return sha256Hex(
    canonicalBytes({
      chain_id: evidence.chain_id,
      contract_address: evidence.contract_address.toLowerCase(),
      settlement_tx: evidence.settlement_tx.toLowerCase(),
      transaction_receipt_hash: evidence.transaction_receipt_hash,
      block_hash: evidence.block_hash,
      log_index: evidence.log_index,
      event_topics: evidence.event_topics.map((topic) => topic.toLowerCase()),
      event_data: evidence.event_data.toLowerCase()
    })
  );
}

async function verifyReceiptTrieProof(evidence: SettlementEvidenceV1): Promise<boolean> {
  if (!evidence.receipt_root || evidence.transaction_index === undefined || !evidence.receipt_rlp?.startsWith("0x") || !evidence.receipt_proof_nodes?.length) {
    return false;
  }
  const trie = await Trie.create({ useKeyHashing: false });
  const value = await trie.verifyProof(
    hexToBytes(evidence.receipt_root),
    encode(evidence.transaction_index),
    evidence.receipt_proof_nodes.map(hexToBytes)
  );
  return Boolean(value && toHex(value) === evidence.receipt_rlp.toLowerCase());
}

function verifyReceiptLog(evidence: SettlementEvidenceV1, checkpoint: BatchCheckpointV1): boolean {
  if (evidence.log_index === undefined || !evidence.receipt_rlp || !evidence.event_topics?.length || !evidence.event_data || !evidence.event_topic_hash) return false;
  const logs = receiptLogs(hexToBytes(evidence.receipt_rlp));
  const log = asList(logs[evidence.log_index]);
  const address = toHex(asBytes(log[0]));
  const topics = asList(log[1]).map((topic) => toHex(asBytes(topic)));
  const data = toHex(asBytes(log[2]));
  if (!hexEq(address, evidence.contract_address)) return false;
  if (data !== evidence.event_data.toLowerCase()) return false;
  if (JSON.stringify(topics.map((topic) => topic.toLowerCase())) !== JSON.stringify(evidence.event_topics.map((topic) => topic.toLowerCase()))) return false;
  if (topics[0] !== CHECKPOINT_TOPIC || evidence.event_topic_hash.toLowerCase() !== CHECKPOINT_TOPIC) return false;
  const decoded = CHECKPOINT_INTERFACE.decodeEventLog("CheckpointSubmitted", data, topics);
  return (
    String(decoded.checkpointHash).toLowerCase() === evidence.checkpoint_identity_hash.toLowerCase() &&
    String(decoded.contractCheckpointFieldsHash).toLowerCase() === evidence.contract_checkpoint_fields_hash.toLowerCase() &&
    Number(decoded.epochStartMs) === checkpoint.epoch_start_ms &&
    String(decoded.shard).toLowerCase() === checkpointShardEventValue(checkpoint.shard).toLowerCase() &&
    String(decoded.eventRoot).toLowerCase() === checkpoint.event_root.toLowerCase() &&
    String(decoded.submitter).toLowerCase() === evidence.submitter.toLowerCase()
  );
}

export async function verifyOfflineSettlementEvidence(input: {
  evidence: SettlementEvidenceV1;
  checkpoint: BatchCheckpointV1;
  checkpoint_hash: Hex32;
  contract_checkpoint_fields_hash: Hex32;
  policy?: VerifierPolicy;
}): Promise<{ ok: boolean; error_code?: string }> {
  const { evidence, checkpoint, checkpoint_hash, contract_checkpoint_fields_hash, policy } = input;
  if (evidence.evidence_kind !== "offline_receipt_log_proof") {
    return policy?.reject_rpc_attested_settlement_for_mainnet || policy?.require_offline_settlement_proof
      ? { ok: false, error_code: "TSL_SETTLEMENT_OFFLINE_PROOF_REQUIRED" }
      : { ok: true };
  }
  try {
    if (!evidence.block_header_rlp || !evidence.receipt_rlp || !evidence.receipt_proof_nodes?.length || !evidence.finality_proof) {
      return { ok: false, error_code: "TSL_SETTLEMENT_RECEIPT_PROOF_INVALID" };
    }
    const blockHash = ethers.keccak256(evidence.block_header_rlp).toLowerCase();
    if (!hexEq(blockHash, evidence.block_hash)) return { ok: false, error_code: "TSL_SETTLEMENT_RECEIPT_PROOF_INVALID" };
    if (!hexEq(receiptRootFromHeader(evidence.block_header_rlp), evidence.receipt_root)) return { ok: false, error_code: "TSL_SETTLEMENT_RECEIPT_PROOF_INVALID" };
    if (blockNumberFromHeader(evidence.block_header_rlp) !== evidence.block_number) return { ok: false, error_code: "TSL_SETTLEMENT_RECEIPT_PROOF_INVALID" };
    if (!hexEq(ethers.keccak256(evidence.receipt_rlp), evidence.transaction_receipt_hash)) return { ok: false, error_code: "TSL_SETTLEMENT_RECEIPT_PROOF_INVALID" };
    if (!(await verifyReceiptTrieProof(evidence))) return { ok: false, error_code: "TSL_SETTLEMENT_RECEIPT_PROOF_INVALID" };
    try {
      if (!verifyReceiptLog(evidence, checkpoint)) return { ok: false, error_code: "TSL_SETTLEMENT_LOG_PROOF_INVALID" };
    } catch {
      return { ok: false, error_code: "TSL_SETTLEMENT_LOG_PROOF_INVALID" };
    }
    if (evidence.settlement_event_hash !== offlineSettlementEventHash(evidence)) return { ok: false, error_code: "TSL_SETTLEMENT_LOG_PROOF_INVALID" };
    if (evidence.receipt_status !== "success" || evidence.status !== "settled") return { ok: false, error_code: "TSL_SETTLEMENT_RECEIPT_PROOF_INVALID" };
    if (!hexEq(evidence.checkpoint_hash, checkpoint_hash) || !hexEq(evidence.checkpoint_identity_hash, checkpoint_hash)) return { ok: false, error_code: "TSL_SETTLEMENT_MISMATCH" };
    if (!hexEq(evidence.contract_checkpoint_fields_hash, contract_checkpoint_fields_hash)) return { ok: false, error_code: "TSL_SETTLEMENT_MISMATCH" };
    if (checkpoint.settlement_backend && evidence.settlement_backend !== checkpoint.settlement_backend) return { ok: false, error_code: "TSL_SETTLEMENT_MISMATCH" };
    if (evidence.receipt_proof_source_commitment !== receiptProofSourceCommitment(evidence)) return { ok: false, error_code: "TSL_SETTLEMENT_RECEIPT_PROOF_INVALID" };
    if (evidence.finality_source_commitment !== finalitySourceCommitment(evidence)) return { ok: false, error_code: "TSL_SETTLEMENT_FINALITY_INVALID" };
    if (evidence.finality_proof.source_commitment !== evidence.finality_source_commitment) return { ok: false, error_code: "TSL_SETTLEMENT_FINALITY_INVALID" };
    if (evidence.finality_proof.type === "finalized_block" && !hexEq(evidence.finality_proof.finalized_block_hash, evidence.block_hash)) {
      return { ok: false, error_code: "TSL_SETTLEMENT_FINALITY_INVALID" };
    }
    if (evidence.finality_proof.type === "confirmations" && (evidence.finality_proof.confirmations ?? 0) < (policy?.min_settlement_confirmations ?? 12)) {
      return { ok: false, error_code: "TSL_SETTLEMENT_FINALITY_INVALID" };
    }
    if (evidence.chain_proof_commitment !== chainProofCommitment(evidence)) return { ok: false, error_code: "TSL_SETTLEMENT_RECEIPT_PROOF_INVALID" };
    return { ok: true };
  } catch {
    return { ok: false, error_code: "TSL_SETTLEMENT_RECEIPT_PROOF_INVALID" };
  }
}

export const settlementProofInternals = {
  CHECKPOINT_SUBMITTED_EVENT,
  CHECKPOINT_TOPIC,
  offlineSettlementEventHash,
  receiptProofSourceCommitment,
  finalitySourceCommitment,
  chainProofCommitment
};
