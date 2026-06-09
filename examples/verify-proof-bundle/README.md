# Verify Proof Bundle Example

This example generates and verifies a deterministic proof bundle.

```bash
npm ci
npm run demo
```

Expected output includes a proof bundle and:

```json
"verification": {
  "verified": true
}
```

The demo exercises the local verifier with a signed event, identity document, Merkle inclusion proof, checkpoint, and redaction manifest. It does not require a live service stack or mainnet settlement.

For the full launch gate, run:

```bash
npm run release:check
```
