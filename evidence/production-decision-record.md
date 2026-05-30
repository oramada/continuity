# Production Decision Record

Status: draft, mainnet-blocking until external evidence is approved.
Owner: release-governance
Last updated: 2026-05-29

This record fixes the production choices for the remaining mainnet blockers. It does not approve release by itself. `Core_architecture.md` remains the authority, and `conformance:mainnet` must stay blocked until the evidence listed here is signed by the named role owners.

## Decisions

### ZK Ceremony And Circuit Release

Decision: run a new ceremony for this protocol release.

Rationale: the repo now has eight production-interface circuits, but the existing local artifacts and dev circuits are not acceptable as production Groth16 releases. A fresh ceremony produces protocol-specific transcript evidence, deterministic release manifests, and auditable verification keys for the exact circuit sources being shipped.

Required circuit releases:

- `identity_age_days`
- `reciprocal_receipt_count`
- `dispute_rate_bound`
- `set_membership`
- `revocation_set_non_membership`
- `organization_membership`
- `agent_scope_compliance`
- `private_graph_distance`

Required ceremony artifacts per circuit:

- circuit source hash
- R1CS hash
- WASM hash
- zkey hash
- verification key hash
- Powers of Tau source and acceptance record
- circuit-specific phase transcript
- participant transcript hashes
- manifest signature
- reviewer or auditor signature
- reproducible compile/prove/verify transcript

Acceptance policy:

- minimum soundness: 100 bits
- hash suite: `poseidon-bn254-v1` inside circuits; canonical SHA-256 for off-circuit manifest commitments
- no `dev_*`, fixture, prototype, toy-linear-hash, or unsafe circuit id may satisfy production policy
- production manifests must include public witness schema, private witness schema, soundness bits, privacy notes, registry status, and active verification key
- mainnet release requires an external cryptography review plus an independent implementation review

### Settlement Verification

Decision: support two evidence kinds, but only full offline proof is mainnet-grade.

- `rpc_attested_receipt`: allowed for RC/testnet and operational diagnostics only. It must be labeled as RPC-attested and must not be represented as full offline proof.
- `offline_receipt_log_proof`: required for mainnet-grade pure verification when settlement evidence is mandatory.

Mainnet offline proof requirements:

- transaction hash
- block hash and block number
- canonical block header
- receipt root
- transaction index
- receipt RLP
- receipt trie proof nodes
- receipt status
- emitted checkpoint event topic/hash
- emitted checkpoint event fields
- log index
- contract address
- checkpoint identity hash
- contract checkpoint fields hash
- submitter
- finality/source proof

For Base mainnet, the finality/source proof must bind the Base receipt/log proof to an accepted finality source. The production target is L2 receipt/log inclusion plus L1-finalized source commitment for the relevant Base output/finality record. Until that proof path is implemented and vector-tested, RPC-attested settlement may be used only as RC evidence.

### Approver Roles

Decision: approvers are role-bound first, then must be mapped to named people or organization identities before approval.

Required approval roles:

- Security approver: `protocol-security-owner`
- Legal/compliance approver: `legal-compliance-owner`
- Ops/on-call approver: `platform-ops-owner`
- Provider governance approver: `protocol-governance-owner`
- ZK/circuit reviewer or auditor: `external-zk-auditor`
- Release governance approver: `release-governance-owner`

Mainnet evidence must include the real signer identity for each role, signature material or approval record, review date, and scope of approval. Generated text or repository-local placeholders do not satisfy approval.

### Target Chain And Deployment Policy

Decision: target Base mainnet for scalable production settlement, with Base Sepolia retained as the testnet rehearsal environment.

Production target:

- network: `base`
- chain id: `8453`
- checkpoint registry: `TBD_MAINNET_DEPLOYMENT`
- revocation registry: `TBD_MAINNET_DEPLOYMENT`
- trust ID registry: `TBD_MAINNET_DEPLOYMENT`
- provider registry: `TBD_MAINNET_DEPLOYMENT`
- governance registry: `TBD_MAINNET_DEPLOYMENT`

Finality policy:

- RC/testnet: RPC-attested receipts may be accepted only when marked `rpc_attested_receipt`.
- Mainnet: settlement must be proven by `offline_receipt_log_proof` or by a separately approved finality oracle evidence type.
- Any finality oracle path must have an explicit source commitment, signer policy, monitoring, and failure runbook.

RPC source policy for RC:

- use at least two independent RPC providers when possible
- record provider identity, chain id, block hash, transaction hash, receipt status, and response commitment
- treat RPC-attested evidence as replayable operational evidence, not cryptographic offline proof
- reject mismatched provider responses

### Local Implementation Continuation

Decision: continue local implementation now on all code-verifiable pieces.

Priority order:

1. ZK artifact/test-vector pipeline for all eight production-interface circuits.
2. Offline settlement proof verifier scaffolding and vectors.
3. Mainnet evidence schemas for ceremony/audit/finality approvals.
4. Conformance vector expansion for every production failure mode.
5. CI wiring for Rust parity and circuit compile/prove/verify gates.

Non-local blockers:

- real ceremony transcript
- external circuit audit
- external security review
- legal/compliance approval
- ops/on-call approval
- deployment addresses and production environment proof
- provider governance approval

