const path = require("node:path");

const ROOT = process.cwd();
const RELEASE_ID = process.env["TSL_" + "ZK_RELEASE_ID"] ?? "local-production-candidate";
const OUT_DIR = process.env["TSL_" + "ZK_PRODUCTION_OUT"] ?? path.join(ROOT, "artifacts", "zk", "production-candidate", RELEASE_ID);
const DEPTH = 16;
const WIDTH = 16;

const CIRCUITS = [
  {
    claim: "identity_age_days",
    name: "production_identity_age_threshold",
    circuit: "circuits/production_identity_age_threshold.circom",
    witness_interface: "identity_age_days.production_witness.v1",
    public_signal_schema: { required: ["subject_hash", "current_epoch_day", "threshold_days", "public_registry_root"] },
    private_witness_schema: { required: ["creation_epoch_day", "registry_salt", "registry_siblings", "registry_path_bits"] },
    privacy_notes: ["Proves identity age threshold without disclosing exact creation registry witness path."]
  },
  {
    claim: "reciprocal_receipt_count",
    name: "production_receipt_count_threshold",
    circuit: "circuits/production_receipt_count_threshold.circom",
    witness_interface: "reciprocal_receipt_count.production_witness.v1",
    public_signal_schema: { required: ["subject_hash", "threshold_count", "public_receipt_root"] },
    private_witness_schema: { required: ["receipt_leaves", "receipt_salts", "counterparty_commitments", "receipt_siblings", "receipt_path_bits", "receipt_valid"] },
    privacy_notes: ["Proves receipt count threshold without disclosing counterparties or exact count beyond threshold."]
  },
  {
    claim: "dispute_rate_bound",
    name: "production_dispute_rate_bound",
    circuit: "circuits/production_dispute_rate_bound.circom",
    witness_interface: "dispute_rate_bound.production_witness.v1",
    public_signal_schema: { required: ["subject_hash", "max_dispute_rate_bps", "public_receipt_root"] },
    private_witness_schema: { required: ["completed_leaves", "disputed_leaves", "completed_siblings", "completed_path_bits", "disputed_siblings", "disputed_path_bits", "completed_valid", "disputed_valid"] },
    privacy_notes: ["Proves dispute-rate upper bound from private completed/disputed receipt paths."]
  },
  {
    claim: "set_membership",
    name: "production_set_membership",
    circuit: "circuits/production_set_membership.circom",
    witness_interface: "set_membership.production_witness.v1",
    public_signal_schema: { required: ["subject_hash", "set_id", "public_set_root"] },
    private_witness_schema: { required: ["membership_salt", "membership_siblings", "membership_path_bits"] },
    privacy_notes: ["Proves private set membership without disclosing the full set."]
  },
  {
    claim: "revocation_set_non_membership",
    name: "production_revocation_non_membership",
    circuit: "circuits/production_revocation_non_membership.circom",
    witness_interface: "revocation_set_non_membership.production_witness.v1",
    public_signal_schema: { required: ["subject_hash", "key_hash", "revocation_pointer_hash", "value_commitment", "public_revocation_root", "sparse_leaf_index"] },
    private_witness_schema: { required: ["empty_leaf_commitment", "sibling_path", "path_bits"] },
    privacy_notes: ["Proves sparse Merkle non-membership for a revocation value commitment."]
  },
  {
    claim: "organization_membership",
    name: "production_organization_membership",
    circuit: "circuits/production_organization_membership.circom",
    witness_interface: "organization_membership.production_witness.v1",
    public_signal_schema: { required: ["subject_hash", "org_hash", "issuer_hash", "current_epoch_day", "public_attestation_root", "issuer_registry_root"] },
    private_witness_schema: { required: ["valid_after_day", "expires_at_day", "attestation_salt", "attestation_siblings", "attestation_path_bits", "issuer_siblings", "issuer_path_bits"] },
    privacy_notes: ["Proves active organization membership with private attestation and issuer paths."]
  },
  {
    claim: "agent_scope_compliance",
    name: "production_delegation_scope",
    circuit: "circuits/production_delegation_scope.circom",
    witness_interface: "agent_scope_compliance.production_witness.v1",
    public_signal_schema: { required: ["subject_hash", "agent_hash", "principal_hash", "action_hash", "parameter_values_hash", "scope_commitment", "delegation_chain_root"] },
    private_witness_schema: { required: ["policy_constraints_hash", "delegation_siblings", "delegation_path_bits", "human_approval_required", "human_approval_present"] },
    privacy_notes: ["Proves delegated action scope compliance without disclosing full policy parameters."]
  },
  {
    claim: "private_graph_distance",
    name: "production_private_graph_distance",
    circuit: "circuits/production_private_graph_distance.circom",
    witness_interface: "private_graph_distance.production_witness.v1",
    public_signal_schema: { required: ["subject_hash", "threshold_distance_bps", "committed_local_neighborhood_root", "trusted_seed_commitment", "adversarial_seed_commitment", "aggregate_proof_commitment"] },
    private_witness_schema: { required: ["local_edge_weights_bps", "trusted_seed_scores_bps", "adversarial_seed_scores_bps", "local_edge_valid"] },
    privacy_notes: ["Proves a private graph-distance threshold from committed local neighborhood aggregates."]
  }
];

module.exports = { ROOT, RELEASE_ID, OUT_DIR, DEPTH, WIDTH, CIRCUITS };
