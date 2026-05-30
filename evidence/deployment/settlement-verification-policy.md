# Settlement Verification Policy

Status: draft, not approved for mainnet.
Owner: platform-ops-owner

## Evidence Kinds

`rpc_attested_receipt` is accepted for RC/testnet evidence only. It is useful for operational verification, but it is not a full offline cryptographic proof.

`offline_receipt_log_proof` is the mainnet-grade evidence kind. It must be verified from bundle-carried data without trusted live network calls.

## Mainnet Target

- network: Base mainnet
- chain id: 8453
- checkpoint registry: `TBD_MAINNET_DEPLOYMENT`
- revocation registry: `TBD_MAINNET_DEPLOYMENT`
- trust ID registry: `TBD_MAINNET_DEPLOYMENT`
- provider registry: `TBD_MAINNET_DEPLOYMENT`
- governance registry: `TBD_MAINNET_DEPLOYMENT`

## Offline Proof Requirements

The verifier must validate:

- block header binding
- receipt root binding
- receipt trie inclusion
- receipt status
- transaction index
- log index
- event topic hash
- emitted checkpoint identity
- emitted contract checkpoint fields hash
- contract address
- submitter
- finality or source proof

For Base mainnet, the finality/source proof must bind the Base receipt/log proof to an accepted finality source. The production verifier may not silently downgrade `offline_receipt_log_proof` to RPC-attested evidence.

## RC RPC Policy

When `rpc_attested_receipt` is used before mainnet:

- collect at least two independent RPC responses when possible
- store the provider/source commitment
- reject chain id mismatch
- reject contract address mismatch
- reject reverted receipts
- reject event topic mismatch
- reject checkpoint identity mismatch
- reject contract field hash mismatch

RPC-attested evidence must stay labeled as such in proof bundles, conformance vectors, and reports.

