# Forge 2 Qualifier - Hermes x OpenClaw Demo

This repo is a qualifier-ready dry run for Forge 2 Edition 1.

It demonstrates:

- Hermes-style orchestrator: plans first, recalls memory, assigns work, reports status.
- OpenClaw-style coding worker: receives a task from chat, writes/runs code, handles one follow-up.
- Chat communication layer: local `channels/*.md` files mirror Slack channels for auditability.
- Persistent memory: `memory/hermes-memory.json`.
- Self-written skill: `skills/status-reporter.mjs`.
- Autonomous run: `npm run autonomous` posts a health check without a new human command.
- CI quality gate: `.github/workflows/ci.yml`.

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

- Public GitHub repo.
- Incremental commits, not one giant final commit.
- `channels/agent-log.md` preserved.
- Slack screenshots or export showing `#commands` and `#agent-log`.
- README with architecture and run commands.
- Architecture diagram in `docs/architecture.md`.
- Loom walkthrough under 5 minutes.

## Loom walkthrough outline

1. Show `#commands` with the human task.
2. Show Hermes plan before acting.
3. Show memory recall and skill invocation.
4. Show OpenClaw worker output.
5. Run `npm test`.
6. Run `npm run autonomous`.
7. Open `outputs/content-audit-result.json` and point to `topKeywords` and `health.passed`.
