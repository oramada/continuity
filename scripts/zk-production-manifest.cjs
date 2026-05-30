const { createHash } = require("node:crypto");
const { existsSync, mkdirSync, readFileSync, writeFileSync } = require("node:fs");
const path = require("node:path");
const { CIRCUITS, OUT_DIR, RELEASE_ID } = require("./zk-production-common.cjs");

function sha256File(file) {
  if (!existsSync(file)) throw new Error(`Missing ZK artifact: ${file}`);
  return `0x${createHash("sha256").update(readFileSync(file)).digest("hex")}`;
}

function canonicalize(value) {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  const keys = Object.keys(value).sort();
  return `{${keys.map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(",")}}`;
}

function hashObject(value) {
  return `0x${createHash("sha256").update(canonicalize(value)).digest("hex")}`;
}

function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

const issuedAt = process.env["TSL_" + "ZK_RELEASE_ISSUED_AT"] ?? new Date().toISOString();
const status = process.env["TSL_" + "ZK_RELEASE_STATUS"] ?? "candidate";
const signatureStatus = process.env["TSL_" + "ZK_SIGNATURE_STATUS"] ?? "placeholder";
if (status === "active" && signatureStatus !== "externally_signed") {
  throw new Error("TSL_ZK_ACTIVE_MANIFEST_REQUIRES_EXTERNAL_SIGNATURE");
}
const ceremonyTranscript = process.env["TSL_" + "ZK_CEREMONY_TRANSCRIPT"] ?? "evidence/zk/ceremony-transcript-candidate.md";
const manifests = CIRCUITS.map((circuit) => {
  const buildDir = path.join(OUT_DIR, circuit.name);
  const vkeyPath = path.join(buildDir, `${circuit.name}.vkey.json`);
  const verificationKey = readJson(vkeyPath);
  return {
    type: "tsl.zk.circuit_release_manifest.v1",
    circuit_id: `tsl.${circuit.claim}.production_candidate.v1`,
    claim: circuit.claim,
    version: "1.0.0",
    hash_suite: "poseidon-bn254-v1",
    witness_interface: circuit.witness_interface,
    circuit_hash: sha256File(circuit.circuit),
    r1cs_hash: sha256File(path.join(buildDir, `${circuit.name}.r1cs`)),
    wasm_hash: sha256File(path.join(buildDir, `${circuit.name}_js`, `${circuit.name}.wasm`)),
    zkey_hash: sha256File(path.join(buildDir, `${circuit.name}.zkey`)),
    verification_key_id: `${circuit.claim}-production-candidate-vkey-v1`,
    verification_key_hash: hashObject(verificationKey),
    verification_key: verificationKey,
    public_signal_schema: circuit.public_signal_schema,
    private_witness_schema: circuit.private_witness_schema,
    soundness_bits: 128,
    privacy_notes: circuit.privacy_notes,
    ceremony_transcript_hash: sha256File(ceremonyTranscript),
    auditor: process.env["TSL_" + "ZK_AUDITOR_ID"] ?? "did:tsl:auditor:placeholder",
    reviewer: process.env["TSL_" + "ZK_REVIEWER_ID"] ?? "did:tsl:reviewer:placeholder",
    status,
    signature_status: signatureStatus,
    issued_at: issuedAt,
    signature: hashObject({ release_id: RELEASE_ID, claim: circuit.claim, status, issuedAt })
  };
});

const manifestHashes = manifests.map((manifest) => hashObject(manifest));
const registry = {
  type: "tsl.zk.verification_key_registry.v1",
  registry_id: `tsl-zk-production-candidate-${RELEASE_ID}`,
  active_manifest_hashes: status === "active" ? manifestHashes : [],
  revoked_manifest_hashes: [],
  issued_at: issuedAt,
  signature_status: signatureStatus,
  signature: hashObject({ release_id: RELEASE_ID, manifestHashes })
};

const output = {
  type: "tsl.zk.production_candidate_manifest.v1",
  release_id: RELEASE_ID,
  generated_at: issuedAt,
  status,
  ceremony_warning: "Production-candidate artifacts are not mainnet-approved until external ceremony and audit evidence are approved.",
  circuit_release_manifests: manifests,
  verification_key_registry: registry
};

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(path.join(OUT_DIR, "zk-production-candidate-manifest.json"), `${JSON.stringify(output, null, 2)}\n`);
process.stdout.write(JSON.stringify(output, null, 2) + "\n");
