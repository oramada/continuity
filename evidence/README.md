# Mainnet Evidence Workspace

This directory stores production-readiness evidence generated or attached during release qualification.

Evidence in this directory is not sufficient for `TSL-MAINNET` unless the production-readiness manifest marks the related item `approved` with an approver, review date, release decision, and no unresolved high or critical findings.

Current production choices are recorded in `evidence/production-decision-record.md`. That record deliberately chooses the stricter path: new ZK ceremony, audited circuit release manifests, full offline settlement proof for mainnet-grade verification, and role-bound approvers that must later be mapped to real signed identities.
