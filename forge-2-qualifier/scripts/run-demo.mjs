import { runQualifierDemo } from "../src/agent-system.mjs";

const result = await runQualifierDemo();
console.log(JSON.stringify(result, null, 2));
