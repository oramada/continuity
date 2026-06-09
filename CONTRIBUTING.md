# Contributing

Continuity Protocol is a developer-preview protocol repository. Contributions should improve correctness, clarity, test coverage, safety, or launch packaging without implying production readiness.

## Local Setup

```bash
npm ci
npm run demo
npm run release:check
```

`npm run release:check` is the public launch gate. It runs build, tests, contracts, ZK checks, conformance, web verifier build, parity checks, and Docker Compose config validation.

## Contribution Rules

- Keep protocol behavior aligned with `Core_architecture.md`.
- Do not claim mainnet readiness unless `conformance:mainnet` passes with real approved evidence.
- Do not commit generated artifacts, local secrets, private keys, large ZK binaries, or local databases.
- Label dev-only keys and local credentials clearly.
- Add or update tests for verifier, schema, settlement, ZK, or conformance behavior changes.

## Pull Request Checklist

- `npm run build`
- `npm test`
- `npm run conformance:spec`
- `npm run release:check` when touching protocol, contracts, ZK, CI, or docs that describe launch readiness
- Docs updated when public interfaces or launch claims change

## Security Issues

Do not open public issues for security vulnerabilities. Follow [SECURITY.md](SECURITY.md).
