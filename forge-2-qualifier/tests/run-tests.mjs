import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { auditContent } from "../src/contentAudit.mjs";

const result = auditContent("Build and ship and launch a clear clear Forge demo with focused status reporting.");

assert.equal(result.wordCount, 14);
assert.equal(result.tone, "action-oriented");
assert.equal(result.health.passed, true);
assert.deepEqual(result.topKeywords[0], { word: "clear", count: 2 });

const generated = JSON.parse(await readFile(new URL("../outputs/content-audit-result.json", import.meta.url), "utf8"));
assert.equal(generated.health.passed, true);
assert.equal(generated.topKeywords.length, 3);

console.log("All qualifier checks passed.");
