import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../frontend/app.js", import.meta.url), "utf8");
const backendRoutes = await readFile(new URL("../backend/routes/api.php", import.meta.url), "utf8");

for (const feature of ["lists", "cards", "tags", "memberId", "dueDate", "moveCard"]) {
  assert.ok(app.includes(feature), `frontend missing ${feature}`);
}

for (const route of ["apiResource('boards'", "apiResource('cards'", "cards/{card}/move", "cards/{card}/tags"]) {
  assert.ok(backendRoutes.includes(route), `backend route missing ${route}`);
}

console.log("Kanban feature checks passed.");
