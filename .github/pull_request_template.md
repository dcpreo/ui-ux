## Summary

<!-- 2–4 sentences: what this PR does and why. A maintainer should understand the goal without opening the diff. -->

-

## Type of change

<!-- Mark one primary type. -->

- [ ] Feature / enhancement
- [ ] Bug fix
- [ ] Tests only (no production behavior change)
- [ ] Documentation
- [ ] Security hardening
- [ ] Data / CSV update
- [ ] CLI (`uipro`) change
- [ ] Other: <!-- describe -->

## Scope

<!-- Keep PRs focused. If this touches multiple areas, explain why they belong together. -->

**In scope:**

-

**Out of scope (follow-up PRs):**

-

## Related work

<!-- Links help reviewers and future you. -->

| Link | ID / reference |
|------|----------------|
| Issue | <!-- #123 or "none" --> |
| Security hardening plan | <!-- e.g. Phase 1, T-010–T-016 or "N/A" --> |
| Prior PR | <!-- e.g. depends on #42 or "none" --> |

## How to review

<!-- Suggested order: which files matter most and what to verify. -->

1.
2.

## Test plan

<!-- Check what you ran. CI must pass; list anything extra you did manually. -->

- [ ] `pip install -e ".[test]" && make test` (or `make test-python` + `make test-cli`)
- [ ] CI **Test** workflow green
- [ ] Manual smoke (if applicable): <!-- command or "N/A" -->

### CLI / assets sync

<!-- Required when changing source of truth under src/ui-ux-pro-max/ -->

- [ ] Not applicable
- [ ] Synced `cli/assets/` from `src/ui-ux-pro-max/` (scripts / data / templates)

```bash
# Example — run only what you changed
cp -r src/ui-ux-pro-max/scripts/* cli/assets/scripts/
cp -r src/ui-ux-pro-max/data/* cli/assets/data/
cp -r src/ui-ux-pro-max/templates/* cli/assets/templates/
```

### Golden / snapshot tests

- [ ] Not applicable
- [ ] No golden files changed
- [ ] Golden files updated **intentionally** — reason: <!-- e.g. ranking tweak, new CSV column -->

## User-facing impact

<!-- Will end users or skill consumers notice a change? -->

- [ ] No behavior change (refactor, tests, docs only)
- [ ] Behavior change — described below:

## Screenshots / sample output

<!-- Optional: CLI output, search results, before/after. -->

<details>
<summary>Expand if helpful</summary>

```text
(paste output)
```

</details>

## Checklist

- [ ] Branch is based on latest `main` (rebased or merged recently)
- [ ] PR targets `main` on `nextlevelbuilder/ui-ux-pro-max-skill` (not a direct push to upstream `main`)
- [ ] Commit messages describe **why**, not only **what**
- [ ] No secrets, API keys, or `.env` files committed
- [ ] CSV / data changes reviewed for accidental prompt-injection phrasing (see [CONTRIBUTING.md](../CONTRIBUTING.md))

---

<!-- For security hardening contributors: see docs/security-hardening-plan.md for phase boundaries (one phase per PR). -->
