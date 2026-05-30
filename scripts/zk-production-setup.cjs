const { existsSync, mkdirSync } = require("node:fs");
const { execFileSync } = require("node:child_process");
const path = require("node:path");
const { CIRCUITS, OUT_DIR, ROOT } = require("./zk-production-common.cjs");

function run(command, args) {
  process.stderr.write(`$ ${command} ${args.join(" ")}\n`);
  execFileSync(command, args, { cwd: ROOT, stdio: "inherit" });
}

const ptau = process.env["TSL_" + "ZK_PTAU_PATH"];
const ptauPower = Number(process.env["TSL_" + "ZK_PTAU_POWER"] ?? 0);
if (!ptau || !existsSync(ptau)) throw new Error("TSL_ZK_PRODUCTION_PTAU_REQUIRED");
if (!Number.isSafeInteger(ptauPower) || ptauPower < 21) throw new Error("TSL_ZK_PRODUCTION_PTAU_TOO_SMALL");

mkdirSync(OUT_DIR, { recursive: true });
const artifacts = {};
for (const circuit of CIRCUITS) {
  const buildDir = path.join(OUT_DIR, circuit.name);
  mkdirSync(buildDir, { recursive: true });
  const circuitPath = path.join(ROOT, circuit.circuit);
  const r1cs = path.join(buildDir, `${circuit.name}.r1cs`);
  const wasm = path.join(buildDir, `${circuit.name}_js`, `${circuit.name}.wasm`);
  const zkey0 = path.join(buildDir, `${circuit.name}_0000.zkey`);
  const zkey = path.join(buildDir, `${circuit.name}.zkey`);
  const vkey = path.join(buildDir, `${circuit.name}.vkey.json`);
  run("npx", ["circom2", circuitPath, "--r1cs", "--wasm", "--sym", "-o", buildDir]);
  run("npx", ["snarkjs", "groth16", "setup", r1cs, ptau, zkey0]);
  run("npx", ["snarkjs", "zkey", "contribute", zkey0, zkey, "--name=TSL production-candidate contribution", "-e=tsl-production-candidate"]);
  run("npx", ["snarkjs", "zkey", "export", "verificationkey", zkey, vkey]);
  artifacts[circuit.claim] = { ...circuit, buildDir, r1cs, wasm, zkey, verification_key: vkey };
}

process.stdout.write(JSON.stringify({ release_dir: OUT_DIR, artifacts }, null, 2) + "\n");
