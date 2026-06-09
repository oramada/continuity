# Governance

Continuity Protocol is currently maintainer-governed during developer preview. The Trust Signature Layer (TSL) protocol surfaces are still changing and are not mainnet-approved.

## Change Categories

- Documentation and examples: maintainer review is sufficient.
- Core protocol objects, schemas, verifier behavior, contracts, ZK circuits, and settlement proof logic: require tests or conformance updates.
- Public readiness, security posture, legal posture, governance policy, or mainnet claims: require explicit maintainer approval and must not bypass evidence gates.

## Mainnet Governance

Mainnet status requires more than merged code. It requires approved production-readiness evidence for ceremony, audit, deployment, security, legal, ops, provider governance, and release governance. Generated local artifacts, placeholder signatures, and draft docs do not satisfy this gate.

## Conformance

`conformance:spec` is the developer-preview protocol gate. `conformance:mainnet` is intentionally stricter and should remain blocked until external evidence is approved.
