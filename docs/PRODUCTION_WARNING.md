# Production Warning

Continuity Protocol is not production-ready.

Do not use this repository for:

- production identity
- legal trust decisions
- financial risk scoring
- irreversible negative claims
- public risk labels
- mainnet settlement
- compliance-sensitive automated decisions

## Why

The codebase contains real protocol implementation work, but production use requires external evidence that local code cannot generate:

- real ZK ceremony and PTAU input
- external ZK/security audit
- signed active ZK manifests and verification-key registry
- Base mainnet deployment evidence
- reviewed offline settlement proof vectors against deployed contracts
- legal, security, ops, provider governance, and release approvals

## Expected Gate

`npm run conformance:mainnet` should remain blocked until approved production-readiness evidence exists. Passing local build, test, and conformance checks does not mean mainnet readiness.
