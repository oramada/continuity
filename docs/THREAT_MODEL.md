# Threat Model

This summary covers the developer-preview repository. It is not a completed external audit.

## Assets

- identity keys and verification methods
- signed protocol objects
- event and receipt commitments
- Merkle roots and checkpoints
- settlement evidence
- ZK manifests and verification keys
- trust assessments, graph features, Sybil assessments, drift reports, and audit findings

## Primary Risks

- forged signatures or incorrect canonicalization
- replayed, stale, or revoked keys
- invalid Merkle proof acceptance
- settlement evidence spoofing
- ZK proof or verification-key mismatch
- unsafe dev keys being treated as production keys
- abusive or unsupported negative attestations
- overclaiming developer-preview status as production readiness

## Current Controls

- canonical byte encoding
- domain-separated hashing
- Ed25519 verification
- schema validation
- Merkle inclusion and non-membership verification
- verifier policy flags
- settlement evidence conformance vectors
- ZK manifest and registry checks
- mainnet evidence gate

## Out Of Scope For Developer Preview

- production key custody
- production monitoring and incident response
- external audit assurance
- legal/compliance approval
- real mainnet finality operations
- public negative-risk-label operation

## Reporting

Report suspected vulnerabilities privately using [SECURITY.md](../SECURITY.md).
