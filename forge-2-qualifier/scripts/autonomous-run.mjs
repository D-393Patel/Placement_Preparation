import { runAutonomousHealthCheck } from "../src/agent-system.mjs";

await runAutonomousHealthCheck();
console.log("Autonomous Hermes health check posted to channels/agent-log.md");
