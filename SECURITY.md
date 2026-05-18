# Security

## Scope

This repository ships:

- **Core skill** — local Python search over bundled CSV data (`src/ui-ux-pro-max/scripts/`)
- **CLI** (`uipro`) — template install and optional legacy ZIP download from GitHub
- **Optional skills** — logo/CIP/icon generation (Google Gemini API), shadcn installer (`npx`)

## Trust boundaries

| Component | Trust level | Notes |
|-----------|-------------|--------|
| CSV / SKILL.md in repo | Trusted after review | Treat data PRs like code; avoid agent-directed instructions in CSV cells |
| `python search.py` | Local read-only | No network; optional `--persist` writes under `design-system/` only (path-jailed) |
| `uipro init` (default) | Bundled templates | No remote download |
| `uipro init --legacy` | GitHub release ZIP | Verifies SHA-256 when release publishes `SHA256SUMS` or `*.zip.sha256`; otherwise warns and downloads unverified |
| Gemini scripts | Third-party API | Prompts and images leave your machine; scope API keys |
| `shadcn_add.py` | `npx shadcn@latest` | Runs remote packages; component names allowlisted |

## Hardening (2026 initiative)

Non-breaking controls added for:

- **Path traversal** — `path_utils.py` validates names and jails `design-system/` writes
- **CLI extract** — `unzip` / PowerShell via `execFile` (no shell string)
- **Brand sync** — `execFileSync` for token CSS regeneration
- **Icon SVG** — strips `<script>`, event handlers, `javascript:` URIs before save
- **shadcn** — component names must match `^[a-z0-9-]+$`

Tests: `make test`, `pytest tests/python/security`, golden fixtures in `tests/python/golden/`.

## Reporting issues

Report vulnerabilities via [GitHub Security Advisories](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/security/advisories) or a private issue to maintainers—do not open public issues with exploit details before a fix is available.

## Contributing safely

See [CONTRIBUTING.md](./CONTRIBUTING.md) and [docs/security-hardening-plan.md](./docs/security-hardening-plan.md).
