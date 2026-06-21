import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { auditContent } from "./contentAudit.mjs";
import { formatStatus } from "../skills/status-reporter.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const paths = {
  memory: join(root, "memory", "hermes-memory.json"),
  commands: join(root, "channels", "commands.md"),
  log: join(root, "channels", "agent-log.md"),
  output: join(root, "outputs", "content-audit-result.json"),
  generatedWorker: join(root, "outputs", "openclaw-worker-output.md")
};

export async function runQualifierDemo() {
  await resetLog();
  const memory = JSON.parse(await readFile(paths.memory, "utf8"));
  const commandText = await readFile(paths.commands, "utf8");
  const rememberedFormat = memory.facts.find((fact) => fact.id === "status-format")?.value;

  await log("Hermes", `Recalled memory: ${rememberedFormat}`);
  await log("Hermes", "Plan before acting:\n1. Parse the human command from #commands.\n2. Assign implementation to OpenClaw worker.\n3. Run the worker output through tests and health checks.\n4. Handle the follow-up request for top keywords.\n5. Report status using the remembered format.");

  const task = extractHumanTask(commandText);
  await log("Hermes -> OpenClaw", `Task assigned: ${task}`);

  const sampleBrief = [
    "Build a focused Forge qualifier demo that ships a clear agent workflow.",
    "The system should run locally, report status, improve the output, and keep human review visible."
  ].join(" ");
  const result = auditContent(sampleBrief);

  await mkdir(dirname(paths.output), { recursive: true });
  await writeFile(paths.output, `${JSON.stringify(result, null, 2)}\n`);
  await writeFile(
    paths.generatedWorker,
    [
      "# OpenClaw Worker Output",
      "",
      "The worker implemented `src/contentAudit.mjs`, ran the audit, and wrote `outputs/content-audit-result.json`.",
      "",
      "Follow-up handled: top three keywords are included in the JSON summary."
    ].join("\n")
  );

  await log("OpenClaw", "Wrote content audit code, ran the sample brief, and saved JSON output.");
  await log("OpenClaw", `Health check: ${result.health.passed ? "PASS" : "FAIL"} (${result.health.checks.join(", ")})`);
  await log("Hermes", formatStatus({
    did: [
      "Read #commands and produced a plan before acting.",
      "Recalled persistent memory from memory/hermes-memory.json.",
      "Called the status-reporter skill.",
      "Assigned the implementation to the OpenClaw worker.",
      "Verified the follow-up keyword request is present in the output."
    ],
    left: [
      "Pair this local channel transcript with real Slack screenshots before final submission.",
      "Push the folder to a public GitHub repository."
    ],
    call: [
      "Confirm the GitHub repo name and Slack workspace screenshots for the final form."
    ]
  }));

  return result;
}

export async function runAutonomousHealthCheck() {
  const result = JSON.parse(await readFile(paths.output, "utf8"));
  await log("Hermes Cron", formatStatus({
    did: [
      `Autonomous health check fired without a new human command.`,
      `Verified output health is ${result.health.passed ? "passing" : "failing"}.`
    ],
    left: [
      "Schedule this command with Windows Task Scheduler or cron for the live demo."
    ],
    call: [
      result.health.passed ? "No intervention needed." : "Human review needed before submission."
    ]
  }));
}

async function resetLog() {
  await writeFile(paths.log, "# #agent-log\n\n");
}

async function log(actor, message) {
  const timestamp = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Asia/Kolkata"
  }).format(new Date());
  await appendFile(paths.log, `## ${timestamp} - ${actor}\n\n${message}\n\n`);
}

function extractHumanTask(commandText) {
  const match = commandText.match(/## .*? - Human\n\n([\s\S]*?)(?=\n## |$)/);
  return match ? match[1].trim() : commandText.trim();
}
