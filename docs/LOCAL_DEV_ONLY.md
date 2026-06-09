# Local Dev-Only Configuration

The repository includes local Docker Compose and Hardhat defaults so contributors can run the stack quickly.

These values are intentionally not production secrets:

- `POSTGRES_PASSWORD=tsl_dev_only`
- local Postgres on `localhost:15432`
- local Redis on `localhost:6379`
- Hardhat chain on `localhost:8545`
- public Hardhat account 0 private key
- deterministic local contract addresses

## Rules

- Never fund the Hardhat account.
- Never use the example private key on Base Sepolia, Base mainnet, or any public chain.
- Never copy `.env.example` into production.
- Never put production secrets in `.env.local`.
- Keep mainnet credentials in a dedicated secret manager or deployment platform, not in git.

## Testnet

Base Sepolia values are for rehearsal only. Use a fresh test-only wallet and expect all testnet keys to be disposable.

## Mainnet

Mainnet requires approved deployment evidence and operational key management. Local dev files do not satisfy production-readiness evidence.
