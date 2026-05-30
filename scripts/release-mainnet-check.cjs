#!/usr/bin/env node
const { spawnSync } = require("node:child_process");

const commands = [
  ["npm", ["run", "build"]],
  ["npm", ["test"]],
  ["npm", ["run", "contracts:compile"]],
  ["npm", ["run", "contracts:test"]],
  ["npm", ["run", "zk:compile:production-interfaces"]],
  ["npm", ["run", "conformance:zk-production"]],
  ["npm", ["run", "conformance:settlement-offline"]],
  ["npm", ["run", "conformance:spec"]],
  ["npm", ["run", "parity:python"]],
  ["npm", ["run", "parity:rust"]],
  ["npm", ["run", "integration:cli-sidecar-v2"]],
];

if (process.env["TSL_" + "ZK_PTAU_PATH"]) {
  commands.splice(6, 0, ["npm", ["run", "zk:setup:production-candidate"]]);
  commands.splice(7, 0, ["npm", ["run", "zk:test:production-candidate"]]);
  commands.splice(8, 0, ["npm", ["run", "zk:manifest:production-candidate"]]);
} else {
  process.stdout.write(`\nSkipping production-candidate Groth16 setup/prove gate: ${"TSL_" + "ZK_PTAU_PATH"} is not set.\n`);
}

if (process.env.TSL_TEST_DATABASE_URL) {
  commands.push(["npm", ["run", "integration:postgres"]]);
  commands.push(["npm", ["run", "integration:hosted-service"]]);
} else {
  process.stdout.write("\nSkipping Postgres and hosted-service integration: TSL_TEST_DATABASE_URL is not set.\n");
}

commands.push(["npm", ["run", "conformance:mainnet"]]);

for (const [cmd, args] of commands) {
  process.stdout.write(`\n$ ${cmd} ${args.join(" ")}\n`);
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) {
    if (cmd === "npm" && args.join(" ") === "run conformance:mainnet") {
      process.stderr.write(
        "\nMAINNET check is expected to remain red until production-readiness evidence is approved by the required human/security/legal/ops owners.\n"
      );
    }
    process.exit(result.status ?? 1);
  }
}
