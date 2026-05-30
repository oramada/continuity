const { existsSync, mkdirSync, readFileSync, writeFileSync } = require("node:fs");
const path = require("node:path");
const snarkjs = require("snarkjs");
const circomlibjs = require("circomlibjs");
const { CIRCUITS, DEPTH, OUT_DIR, RELEASE_ID, WIDTH } = require("./zk-production-common.cjs");

const SUBJECT_HASH = "12345";
const zeros = (n) => Array.from({ length: n }, () => "0");
const zeroMatrix = (rows, cols) => Array.from({ length: rows }, () => zeros(cols));

async function poseidonHelpers() {
  const poseidon = await circomlibjs.buildPoseidon();
  const F = poseidon.F;
  const p = (inputs) => F.toObject(poseidon(inputs.map(BigInt))).toString();
  const merkle = (leaf) => {
    let current = leaf;
    for (let i = 0; i < DEPTH; i += 1) current = p([current, 0]);
    return current;
  };
  return { p, merkle };
}

async function witnessFor(claim, helpers) {
  const { p, merkle } = helpers;
  if (claim === "identity_age_days") {
    const leaf = p([SUBJECT_HASH, 100, 777]);
    return {
      creation_epoch_day: 100,
      current_epoch_day: 1000,
      threshold_days: 365,
      subject_hash: SUBJECT_HASH,
      registry_salt: "777",
      registry_siblings: zeros(DEPTH),
      registry_path_bits: zeros(DEPTH),
      public_registry_root: merkle(leaf)
    };
  }
  if (claim === "reciprocal_receipt_count") {
    const leafHash = p([SUBJECT_HASH, 9001, 42, 7001]);
    return {
      subject_hash: SUBJECT_HASH,
      threshold_count: 2,
      public_receipt_root: merkle(leafHash),
      receipt_leaves: Array.from({ length: WIDTH }, () => "9001"),
      receipt_salts: Array.from({ length: WIDTH }, () => "42"),
      counterparty_commitments: Array.from({ length: WIDTH }, () => "7001"),
      receipt_siblings: zeroMatrix(WIDTH, DEPTH),
      receipt_path_bits: zeroMatrix(WIDTH, DEPTH),
      receipt_valid: Array.from({ length: WIDTH }, (_, i) => (i < 2 ? 1 : 0))
    };
  }
  if (claim === "dispute_rate_bound") {
    const leafHash = p([SUBJECT_HASH, 9010]);
    return {
      subject_hash: SUBJECT_HASH,
      max_dispute_rate_bps: 2000,
      public_receipt_root: merkle(leafHash),
      completed_leaves: Array.from({ length: WIDTH }, () => "9010"),
      disputed_leaves: Array.from({ length: WIDTH }, () => "9010"),
      completed_siblings: zeroMatrix(WIDTH, DEPTH),
      completed_path_bits: zeroMatrix(WIDTH, DEPTH),
      disputed_siblings: zeroMatrix(WIDTH, DEPTH),
      disputed_path_bits: zeroMatrix(WIDTH, DEPTH),
      completed_valid: Array.from({ length: WIDTH }, (_, i) => (i < 10 ? 1 : 0)),
      disputed_valid: Array.from({ length: WIDTH }, (_, i) => (i === 0 ? 1 : 0))
    };
  }
  if (claim === "set_membership") {
    const leaf = p([SUBJECT_HASH, 222, 7777]);
    return {
      subject_hash: SUBJECT_HASH,
      membership_salt: "222",
      set_id: "7777",
      public_set_root: merkle(leaf),
      membership_siblings: zeros(DEPTH),
      membership_path_bits: zeros(DEPTH)
    };
  }
  if (claim === "revocation_set_non_membership") {
    const value = p([SUBJECT_HASH, 333, 444]);
    const emptyLeaf = p([0, 0]);
    return {
      subject_hash: SUBJECT_HASH,
      key_hash: "333",
      revocation_pointer_hash: "444",
      value_commitment: value,
      empty_leaf_commitment: emptyLeaf,
      public_revocation_root: merkle(emptyLeaf),
      sparse_leaf_index: p([value]),
      sibling_path: zeros(DEPTH),
      path_bits: zeros(DEPTH)
    };
  }
  if (claim === "organization_membership") {
    const attestationLeaf = p([SUBJECT_HASH, 555, 666, 2000, 777]);
    return {
      subject_hash: SUBJECT_HASH,
      org_hash: "555",
      issuer_hash: "666",
      valid_after_day: 100,
      expires_at_day: 2000,
      current_epoch_day: 1000,
      attestation_salt: "777",
      public_attestation_root: merkle(attestationLeaf),
      issuer_registry_root: merkle("666"),
      attestation_siblings: zeros(DEPTH),
      attestation_path_bits: zeros(DEPTH),
      issuer_siblings: zeros(DEPTH),
      issuer_path_bits: zeros(DEPTH)
    };
  }
  if (claim === "agent_scope_compliance") {
    const leaf = p([SUBJECT_HASH, 1001, 1002, 1003, 1004, 1005, 1006]);
    return {
      subject_hash: SUBJECT_HASH,
      agent_hash: "1001",
      principal_hash: "1002",
      action_hash: "1003",
      parameter_values_hash: "1004",
      policy_constraints_hash: "1005",
      scope_commitment: "1006",
      delegation_chain_root: merkle(leaf),
      delegation_siblings: zeros(DEPTH),
      delegation_path_bits: zeros(DEPTH),
      human_approval_required: 1,
      human_approval_present: 1
    };
  }
  if (claim === "private_graph_distance") {
    const weights = Array.from({ length: WIDTH }, (_, i) => (i < 3 ? 1000 : 0));
    const trusted = Array.from({ length: WIDTH }, (_, i) => (i < 3 ? 9000 : 0));
    const adversarial = Array.from({ length: WIDTH }, () => 0);
    const valid = Array.from({ length: WIDTH }, (_, i) => (i < 3 ? 1 : 0));
    const trustedMass = 3 * 1000 * 9000;
    const adversarialMass = 0;
    const totalMass = 3 * 1000 * 10000;
    const distanceNumerator = trustedMass + (totalMass - adversarialMass);
    const neighborhoodRoot = p([SUBJECT_HASH, 1]);
    const trustedSeed = p([2]);
    const adversarialSeed = p([3]);
    return {
      subject_hash: SUBJECT_HASH,
      threshold_distance_bps: 5000,
      committed_local_neighborhood_root: neighborhoodRoot,
      trusted_seed_commitment: trustedSeed,
      adversarial_seed_commitment: adversarialSeed,
      aggregate_proof_commitment: p([SUBJECT_HASH, neighborhoodRoot, trustedSeed, adversarialSeed, distanceNumerator]),
      local_edge_weights_bps: weights,
      trusted_seed_scores_bps: trusted,
      adversarial_seed_scores_bps: adversarial,
      local_edge_valid: valid
    };
  }
  throw new Error(`Unsupported production ZK claim: ${claim}`);
}

async function main() {
  const helpers = await poseidonHelpers();
  const vectorsRoot = path.join(OUT_DIR, "vectors", "zk-production");
  mkdirSync(vectorsRoot, { recursive: true });
  const results = [];
  for (const circuit of CIRCUITS) {
    const buildDir = path.join(OUT_DIR, circuit.name);
    const wasm = path.join(buildDir, `${circuit.name}_js`, `${circuit.name}.wasm`);
    const zkey = path.join(buildDir, `${circuit.name}.zkey`);
    const vkeyPath = path.join(buildDir, `${circuit.name}.vkey.json`);
    if (!existsSync(wasm) || !existsSync(zkey) || !existsSync(vkeyPath)) throw new Error(`Missing production candidate artifacts for ${circuit.name}`);
    const input = await witnessFor(circuit.claim, helpers);
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, wasm, zkey);
    const vkey = JSON.parse(readFileSync(vkeyPath, "utf8"));
    const valid = await snarkjs.groth16.verify(vkey, publicSignals, proof);
    const tamperedSignals = [...publicSignals];
    tamperedSignals[0] = String(BigInt(tamperedSignals[0]) + 1n);
    const tampered = await snarkjs.groth16.verify(vkey, tamperedSignals, proof);
    if (!valid || tampered) throw new Error(`Production ZK proof/tamper test failed for ${circuit.claim}`);
    const claimDir = path.join(vectorsRoot, circuit.claim);
    mkdirSync(claimDir, { recursive: true });
    const vector = {
      release_id: RELEASE_ID,
      claim: circuit.claim,
      cases: {
        positive: { verifier_status: true, error_code: null },
        public_signal_tamper: { verifier_status: false, error_code: "TSL_ZK_PROOF_INVALID" },
        wrong_verification_key: { verifier_status: false, error_code: "TSL_ZK_VERIFICATION_KEY_MISMATCH" },
        wrong_manifest_hash: { verifier_status: false, error_code: "TSL_ZK_PROOF_INVALID" },
        missing_private_witness_field: { verifier_status: false, error_code: "TSL_ZK_WITNESS_INTERFACE_INCOMPLETE" },
        dev_circuit_rejected: { verifier_status: false, error_code: "TSL_ZK_DEV_CIRCUIT_REJECTED" },
        revoked_manifest: { verifier_status: false, error_code: "TSL_ZK_MANIFEST_INACTIVE" },
        inactive_manifest: { verifier_status: false, error_code: "TSL_ZK_MANIFEST_INACTIVE" }
      },
      public_signals: publicSignals.map(String)
    };
    writeFileSync(path.join(claimDir, "manifest.json"), `${JSON.stringify(vector, null, 2)}\n`);
    results.push({ claim: circuit.claim, valid, tampered_public_signal_valid: tampered });
  }
  process.stdout.write(JSON.stringify({ release_id: RELEASE_ID, results }, null, 2) + "\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
