# Offline Settlement Vector Evidence

Status: draft.

The executable offline settlement vector catalog lives at `specs/test-vectors/settlement-offline/catalog.json` and is enforced by `npm run conformance:settlement-offline`.

Mainnet approval requires the same vector family to be replayed against deployed Base mainnet checkpoint events, block headers, receipt trie proofs, log proofs, and finality/source evidence.
