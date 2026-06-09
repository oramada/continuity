import { buildGroth16ThresholdProof, subjectHashField, verifyThresholdProofAsync, type ZkThresholdProofV1 } from "../packages/core-ts/src/index";

const subject = "did:tsl:test:alice";

async function proveAndCheck(input: {
  claim: ZkThresholdProofV1["claim"];
  value: number;
  threshold: number;
  wasm_path: string;
  zkey_path: string;
  receipt_leaves?: string[];
  receipt_salts?: string[];
  counterparty_commitments?: string[];
  receipt_valid?: number[];
}) {
  const proof = await buildGroth16ThresholdProof({
    ...input,
    subject,
    witness_salt: "0x9999999999999999999999999999999999999999999999999999999999999999",
    issued_at: "2026-05-25T00:01:00Z"
  });
  const valid = await verifyThresholdProofAsync(proof);
  const alteredThreshold = await verifyThresholdProofAsync({ ...proof, threshold: proof.threshold + 1 });
  const alteredSubject = await verifyThresholdProofAsync({ ...proof, subject: "did:tsl:test:bob" });
  if (!valid) throw new Error(`${input.claim} ZK proof did not verify`);
  if (alteredThreshold) throw new Error(`${input.claim} altered threshold verified unexpectedly`);
  if (alteredSubject) throw new Error(`${input.claim} altered subject verified unexpectedly`);
  return { claim: input.claim, valid, altered_threshold: alteredThreshold, altered_subject: alteredSubject, public_signals: proof.groth16?.public_signals };
}

const results = [
  await proveAndCheck({
    claim: "identity_age_days",
    value: 800,
    threshold: 365,
    wasm_path: "circuits/build/identity_age_threshold_js/identity_age_threshold.wasm",
    zkey_path: "circuits/build/identity_age_threshold.zkey"
  }),
  await proveAndCheck({
    claim: "reciprocal_receipt_count",
    value: 6,
    threshold: 5,
    wasm_path: "circuits/build/reciprocal_receipt_count_threshold_js/reciprocal_receipt_count_threshold.wasm",
    zkey_path: "circuits/build/reciprocal_receipt_count_threshold.zkey",
    receipt_salts: Array.from({ length: 8 }, (_, index) => String(index + 10)),
    counterparty_commitments: Array.from({ length: 8 }, (_, index) => String(index + 100)),
    receipt_valid: Array.from({ length: 8 }, (_, index) => (index < 6 ? 1 : 0)),
    receipt_leaves: Array.from({ length: 8 }, (_, index) =>
      index < 6 ? (BigInt(subjectHashField(subject)) + BigInt(index + 10) + BigInt(index + 100)).toString() : "0"
    )
  })
];

process.stdout.write(JSON.stringify({ results }, null, 2) + "\n");
process.exit(0);
