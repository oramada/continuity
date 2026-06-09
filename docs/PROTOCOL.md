# Protocol Overview

Trust Signature Layer (TSL) defines portable evidence objects for Continuity Protocol.

## Objects

TSL objects include identities, event commitments, receipt commitments, attestations, revocations, batch checkpoints, proof bundles, trust assessments, graph evidence, Sybil assessments, drift reports, agent delegations, audit findings, settlement evidence, and ZK proof metadata.

## Verification

Verification combines:

- JSON schema validation
- canonical byte hashing
- domain-separated commitments
- Ed25519 signature verification
- key status and revocation checks
- Merkle inclusion and non-membership proofs
- checkpoint consistency
- optional settlement evidence
- optional ZK proof and manifest checks
- optional scoring, graph, Sybil, drift, and governance policy checks

## Settlement Evidence

`rpc_attested_receipt` is useful for RC, testnet, and diagnostics. It is not mainnet-grade.

`offline_receipt_log_proof` is the stronger path. It verifies bundle-carried block header RLP, receipt RLP, receipt trie proof nodes, event/log decoding, checkpoint binding, submitter, status, and finality/source commitment.

## ZK Evidence

The repo includes production-interface circuits and a production-candidate artifact pipeline. Candidate manifests do not become active until externally signed and approved. Dev circuits and placeholder ceremonies are rejected by production policy.

## Formal Spec

`Core_architecture.md` remains the formal architecture and protocol artifact. Public docs summarize it for contributors and reviewers.
