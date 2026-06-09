# Simple Signed Message Example

This example uses the existing CLI to generate a deterministic signed message vector.

```bash
npm ci
npm run cli -- vector
```

Expected output includes:

```json
{
  "public_key_hex": "...",
  "content_commitment_hex": "...",
  "event_hash_hex": "...",
  "signature_hex": "...",
  "commitment_hash_hex": "..."
}
```

The vector demonstrates canonical bytes, domain-separated hashing, Ed25519 signing, and commitment generation. It is deterministic developer-preview data, not a production credential or live trust claim.
