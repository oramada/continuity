# Production ZK Ceremony Plan

Status: draft, not approved for mainnet.
Owner: external-zk-auditor

## Scope

The ceremony covers the eight production-interface circuits:

- `production_identity_age_threshold.circom`
- `production_receipt_count_threshold.circom`
- `production_dispute_rate_bound.circom`
- `production_set_membership.circom`
- `production_revocation_non_membership.circom`
- `production_organization_membership.circom`
- `production_delegation_scope.circom`
- `production_private_graph_distance.circom`

## Ceremony Choice

The selected path is a new circuit-specific ceremony for this release. Existing local zkeys and dev setup artifacts are not accepted for production or mainnet.

## Required Inputs

- pinned source tree commit
- pinned compiler versions
- pinned `circomlib` version
- reproducible circuit compile transcript
- accepted Powers of Tau artifact with source and hash
- participant list or participation policy
- contribution transcript hashes
- final zkey hash
- verification key hash
- manifest hash

## Required Reviews

- circuit source review
- constraint-system review
- witness-interface review
- privacy-leakage review
- ceremony transcript review
- verification-key registry review

## Approval Rule

Mainnet approval requires:

- signed `zk_circuit_release_manifest.v1` per circuit
- signed `zk_verification_key_registry.v1`
- external ZK auditor approval
- protocol security approval
- no unresolved high or critical findings

Placeholders, generated summaries, and unaudited dev artifacts do not satisfy this plan.

