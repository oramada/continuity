# Roadmap

## Public Developer Preview

- Clear root README.
- Quickstart and examples.
- Apache-2.0 license.
- Security, contribution, conduct, and governance policies.
- CI badge and release-check proof.
- Explicit developer-preview warnings.

## Protocol Hardening

- Expand test vectors.
- Keep Python and Rust parity aligned with TypeScript behavior.
- Continue strengthening settlement, ZK, graph, scoring, and verifier conformance.
- Document schema and object lifecycle changes as they happen.

## External Review

- Complete external ZK circuit review.
- Complete protocol security audit.
- Review negative-attestation abuse controls.
- Review privacy and legal risk around scoring and risk labels.

## Production Candidate

- Run real ZK ceremony with adequate PTAU input.
- Produce externally signed circuit manifests and verification-key registry.
- Deploy contracts to Base mainnet.
- Replay offline settlement vectors against deployed contracts.
- Gather legal, security, ops, provider governance, and release approvals.

## Mainnet

Mainnet is only available after `conformance:mainnet` passes with approved evidence. It is not part of the public developer-preview launch.
