# Security Policy

Continuity Protocol is a developer-preview implementation of the Trust Signature Layer (TSL). It handles identity documents, signatures, revocations, trust assessments, settlement evidence, and ZK proof metadata. Treat security reports seriously and do not disclose vulnerabilities publicly before maintainers have had time to respond.

## Supported Status

The current repository is developer preview only. No version is approved for production identity, legal trust, financial risk scoring, irreversible negative claims, or mainnet settlement.

## Reporting A Vulnerability

Use GitHub private vulnerability reporting if it is enabled for this repository. If it is not enabled, contact the repository maintainers through a private channel before opening any public issue.

Please include:

- affected commit or release
- reproduction steps
- impact
- affected protocol object, service, contract, or circuit
- whether exploitability requires local dev, testnet, or production-like deployment

## What Not To Publish Publicly

Do not publicly post private keys, exploitable proof bypasses, signature forgery details, settlement proof bypasses, verifier bypasses, or vulnerabilities that could enable abusive negative attestations.

## Expected Response

Maintainers should acknowledge high-impact reports within 7 days. Critical cryptography, settlement, identity, or verifier issues should receive an initial triage target within 72 hours after acknowledgement.

## Safe Harbor

Good-faith security research is welcome when it avoids privacy harm, service disruption, data destruction, social engineering, and public disclosure before remediation. Developer-preview status does not authorize testing against third-party systems or mainnet deployments.

## Cryptography And Production Warning

This project is not externally audited. ZK production manifests remain candidate or draft until a real ceremony, external review, signed active registry approval, and production-readiness evidence are complete. `conformance:mainnet` is intentionally blocked until those approvals exist.
