# Architecture

Continuity Protocol is the public project. Trust Signature Layer (TSL) is the underlying protocol implementation.

## Core Flow

1. A subject or service creates a canonical protocol object.
2. The object is hashed with explicit domain separation.
3. The object is signed or committed.
4. Commitments are grouped into Merkle roots and checkpoints.
5. Verifiers check schemas, signatures, keys, Merkle proofs, settlement evidence, policy, and optional ZK claims.

## Main Subsystems

- Core TypeScript library: canonicalization, hashes, signatures, Merkle proofs, schemas, verifier, settlement evidence, ZK proof metadata, graph/scoring helpers.
- Contracts: local and testnet EVM registries for identity, checkpoints, revocations, providers, and governance.
- Services: relay, log node, resolver, verifier API, checkpoint submitter, scoring provider, and auditor.
- Clients: CLI, agent sidecar, and web verifier.
- Conformance: schema examples, test vectors, release checks, Python parity, Rust parity, ZK production-interface checks, and offline settlement vectors.

## Trust Boundaries

The verifier is the main trust boundary. It should reject malformed schema data, invalid signatures, invalid Merkle proofs, stale or revoked keys, policy mismatches, invalid ZK proof bindings, invalid settlement evidence, and mainnet claims without approved evidence.

## Production Boundary

Developer-preview checks can pass while mainnet remains blocked. Production requires external ceremony, audit, deployment, security, legal, ops, provider governance, and release approvals.
