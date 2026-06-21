# Forge 2 Qualifier - Hermes x OpenClaw Demo

This is my Forge 2 Edition 1 qualifier submission.

It demonstrates:

- Hermes-style orchestrator: plans first, recalls memory, assigns work, reports status.
- OpenClaw-style coding worker: receives a task from chat, writes/runs code, handles one follow-up.
- Chat communication layer: local `channels/*.md` files mirror Slack channels for auditability.
- Persistent memory: `memory/hermes-memory.json`.
- Self-written skill: `skills/status-reporter.mjs`.
- Autonomous run: `npm run autonomous` posts a health check without a new human command.
- CI quality gate: `.github/workflows/ci.yml`.

## Submission links

- Loom walkthrough: https://www.loom.com/share/b0ac60fd04894c9dbecefc605503045e
- Evidence PDF: `docs/forge-2-qualifier-screenshots.pdf`
- Architecture: `docs/architecture.md`
- Submission note: `docs/submission-note.md`

## Qualifier compliance matrix

| Requirement | Evidence |
| --- | --- |
| Coding agent controlled from chat | `channels/commands.md`, Slack `#commands` screenshot in evidence PDF |
| Agent writes/runs code | `src/contentAudit.mjs`, `scripts/run-demo.mjs`, PowerShell verification screenshot |
| Result posted back to agent log | `channels/agent-log.md`, Slack `#agent-log` screenshots |
| Follow-up handled | `topKeywords` in `outputs/content-audit-result.json` and `channels/agent-log.md` |
| Orchestrator plans before acting | Hermes plan in `channels/agent-log.md` |
| Persistent memory | `memory/hermes-memory.json` |
| Self-written skill | `skills/status-reporter.mjs` |
| Autonomous run | `scripts/autonomous-run.mjs`, `npm run autonomous`, Hermes Cron log |
| Public GitHub repo | This repository |
| Quality gate | `tests/run-tests.mjs`, `.github/workflows/ci.yml` |

## Judge quickstart

Run the full qualifier loop:

```bash
npm run qualifier
```

The command runs:

1. Hermes-style planning and worker assignment.
2. OpenClaw-style content-audit worker output.
3. Tests and health checks.
4. Autonomous Hermes health-check post.

## Run locally

```bash
npm run qualifier
```

Expected result:

- `outputs/content-audit-result.json` is created.
- `channels/agent-log.md` contains the Hermes plan, OpenClaw worker update, follow-up handling, structured status report, and autonomous health check.
- `npm test` passes.

## Slack mapping for the live qualifier

Use these local files as the script for your Slack evidence:

| Local file | Slack channel |
| --- | --- |
| `channels/commands.md` | `#commands` |
| `channels/agent-log.md` | `#agent-log` |
| `memory/hermes-memory.json` | Hermes memory proof |
| `skills/status-reporter.mjs` | self-written Hermes skill |

For the live recording, paste the first command from `channels/commands.md` into Slack, run `npm run demo`, then paste the follow-up command and show that the result includes `topKeywords`.

## Real OpenClaw setup path

OpenClaw's current README recommends Node 22.19+ or Node 24 and:

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
openclaw gateway status
```

After onboarding, connect Slack and route `#commands` to this workspace. Keep `channels/agent-log.md` as the permanent artifact even if the live messages are in Slack.

## Real Hermes setup path

Configure Hermes as the product-owner/orchestrator profile:

- Memory source: `memory/hermes-memory.json`.
- Skill folder: `skills/`.
- Planning rule: post a plan before calling the worker.
- Worker handoff: send coding tasks to OpenClaw through Slack only.
- Autonomous trigger: run `npm run autonomous` through cron or Windows Task Scheduler.

## Submission checklist

- Public GitHub repo: done.
- Incremental commits: done.
- `channels/agent-log.md` preserved: done.
- Slack screenshots showing `#commands` and `#agent-log`: done in `docs/forge-2-qualifier-screenshots.pdf`.
- README with architecture and run commands: done.
- Architecture diagram in `docs/architecture.md`: done.
- Loom walkthrough under 5 minutes: done.

## Loom walkthrough outline

1. Show `#commands` with the human task.
2. Show Hermes plan before acting.
3. Show memory recall and skill invocation.
4. Show OpenClaw worker output.
5. Run `npm test`.
6. Run `npm run autonomous`.
7. Open `outputs/content-audit-result.json` and point to `topKeywords` and `health.passed`.
