# Install Evidence

Generated on 21 June 2026.

## Installed locally

| Tool | Verified version/status |
| --- | --- |
| Node.js | `v22.20.0` |
| npm | `11.7.0` |
| PHP | `PHP 8.5.7` portable install in `tools/php-8.5.7` |
| Composer | `2.10.1` via `tools/composer.phar` |
| OpenClaw | `OpenClaw 2026.6.9` |
| OpenClaw Slack plugin | installed as plugin `slack` |
| Hermes Agent | `Hermes Agent v0.17.0 (2026.6.19)` |

## Verification commands

```powershell
php -v
php C:\Users\Slim-5\OneDrive\Documents\Preparation_general\tools\composer.phar --version
openclaw --version
openclaw status
openclaw plugins install @openclaw/slack
hermes --version
hermes doctor
```

## Notes

- OpenClaw is installed and the Slack plugin is installed, but the bot tokens are not committed for safety.
- Hermes is installed and available, but real provider/API keys still need to be entered through `hermes setup` or environment variables.
- Laravel backend tests pass with in-memory SQLite on this OneDrive-backed machine. File-backed SQLite writes are blocked locally by Windows/OneDrive disk I/O permissions, but the repo includes normal SQLite `.env.example` settings for judge machines.
