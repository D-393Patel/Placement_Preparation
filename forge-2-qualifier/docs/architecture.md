# Architecture

```mermaid
flowchart LR
  Human["Human reviewer"] --> Commands["Slack #commands"]
  Commands --> Hermes["Hermes Agent\nProduct owner / orchestrator"]
  Memory["Persistent memory\nmemory/hermes-memory.json"] --> Hermes
  Skill["Self-written skill\nstatus-reporter"] --> Hermes
  Hermes --> AgentLog["Slack #agent-log"]
  Hermes --> OpenClaw["OpenClaw Coding Agent\nworker"]
  OpenClaw --> Repo["Shared GitHub repo"]
  Repo --> CI["CI quality gate\nnpm test"]
  CI --> Output["Release candidate\ncontent-audit-result.json"]
  Output --> Health["Canary health check\nnpm run autonomous"]
  Health --> AgentLog
  AgentLog --> Human
```

## Role boundaries

Hermes owns planning, task decomposition, memory recall, status reporting, and human approval points.

OpenClaw owns implementation, local execution, tests, and worker output.

The agents communicate only through the chat layer. In this dry run, Markdown channel files stand in for Slack. In the live qualifier, use the same channel names in Slack and preserve screenshots or exports.

## Quality gate

The CI gate is intentionally small:

- The content audit must classify tone.
- The output must include the top three keywords requested in the follow-up.
- The health check must pass.

This is enough to prove the loop without overbuilding before the qualifier deadline.
