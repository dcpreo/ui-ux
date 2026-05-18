# Contributing to UI/UX Pro Max

> **For maintainers:** This file is **not** on upstream `main` today. It is **proposed** in the security-hardening PR as a suggested contributor guide. You may merge it as-is, edit it, or drop it; tests and code hardening do not depend on this file.

Thank you for contributing. This project is maintained by [Next Level Builder](https://github.com/nextlevelbuilder). Clear, scoped pull requests help maintainers review quickly and merge with confidence.

## Before you start

1. **Fork** [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (do not push directly to upstream `main`).
2. Read repository layout in [CLAUDE.md](./CLAUDE.md) — especially **source of truth** and **sync rules**.
3. For security hardening work, follow the phased plan in [docs/security-hardening-plan.md](./docs/security-hardening-plan.md).

## Branch naming

| Prefix | Use for |
|--------|---------|
| `feat/` | New features or enhancements |
| `fix/` | Bug fixes |
| `test/` | Test harness, goldens, CI only |
| `docs/` | Documentation only |
| `chore/` | Tooling, deps, non-user-facing cleanup |

Examples:

- `test/phase-0-harness`
- `feat/security-hardening-path-jail`
- `fix/search-domain-detection`

## Pull request structure

Every PR should be **easy to scan in under two minutes**:

1. **Summary** — What and why (not a file list).
2. **Type & scope** — One primary intent; call out what you deliberately excluded.
3. **How to review** — Ordered steps or “start with these files”.
4. **Test plan** — Commands run + CI status.
5. **Impact** — Whether skill/CLI behavior changes.

GitHub pre-fills this from [.github/pull_request_template.md](./.github/pull_request_template.md). **Do not delete the sections** — write “N/A” or check boxes where appropriate.

### Size and focus

| Prefer | Avoid |
|--------|--------|
| One logical change per PR | Tests + hardening + data refresh in one PR |
| &lt; ~500 lines when possible | Unrelated drive-by refactors |
| Follow-up PRs linked in “Out of scope” | Hidden scope creep |

### Security hardening initiative

Follow [docs/security-hardening-plan.md](./docs/security-hardening-plan.md).

**Default for this initiative:** implement phases 0–6 **locally** on one branch (`feat/security-hardening`), run `make test` after each phase, and open **one upstream PR** when the full plan is complete. Phases are for task tracking and commits—not separate upstream PRs unless a maintainer asks to split.

In that single PR, include a **phases delivered** table and list all completed task IDs (`T-001`, `T-010`, etc.).

## Development setup

### Python (core skill)

```bash
pip install -e ".[test]"
make test-python
# or
pytest tests/python -v
```

Scripts and data source of truth: `src/ui-ux-pro-max/`.

### CLI (`uipro`)

Requires [Bun](https://bun.sh):

```bash
cd cli && bun install && bun run build
bun test ../tests/cli   # from cli/
# or from repo root:
make test-cli
```

### All tests

```bash
make test
```

### Regenerate golden fixtures

After intentional search ranking or CSV changes:

```bash
python3 scripts/regenerate_goldens.py
pytest tests/python/golden -v
```

CI runs the same via [.github/workflows/test.yml](./.github/workflows/test.yml).

## Syncing `cli/assets/` (required for many changes)

After editing under `src/ui-ux-pro-max/`:

```bash
cp -r src/ui-ux-pro-max/data/* cli/assets/data/
cp -r src/ui-ux-pro-max/scripts/* cli/assets/scripts/
cp -r src/ui-ux-pro-max/templates/* cli/assets/templates/
```

Mention this in the PR **Test plan** section so reviewers can verify.

## Data and CSV changes

- Edit files in `src/ui-ux-pro-max/data/` only (then sync to `cli/assets/data/`).
- Keep rows factual; avoid instructions aimed at AI agents (“ignore previous…”, “run curl…”) — see [docs/security-hardening-plan.md](./docs/security-hardening-plan.md) threat notes.
- Large CSV diffs: note **why** in the PR summary (new product type, typo fix, etc.).

## Commit messages

- Use complete sentences; explain **why**.
- Match existing style: `feat: …`, `fix: …`, `test: …`, `docs: …`.
- Do not `@` mention bots to merge; wait for maintainer review.

## Opening a PR (fork workflow)

```bash
git checkout main
git pull upstream main   # add upstream remote once: git remote add upstream https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git
git checkout -b feat/your-branch-name

# … make changes, test …

git push -u origin feat/your-branch-name
gh pr create --base main --title "feat: short description" --body-file /tmp/pr-body.md
```

Use the PR template body. Target **`nextlevelbuilder/ui-ux-pro-max-skill`** `main` from your fork.

## Review expectations

Maintainers may ask you to:

- Split an oversized PR
- Add or update tests
- Sync `cli/assets/`
- Rebase on latest `main`

CI **Test** must pass before merge.

## Questions

- **Bugs / features:** [GitHub Issues](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/issues)
- **Security hardening progress:** [docs/security-hardening-plan.md](./docs/security-hardening-plan.md) (session state + task table)

## Code of conduct

Be respectful and constructive. Maintainers reserve the right to close PRs that are out of scope, lack tests, or ignore the template without explanation.
