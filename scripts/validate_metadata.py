#!/usr/bin/env python3
"""Validate public package/plugin metadata stays aligned."""

import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def load_json(path: Path) -> dict:
    with open(path, "r", encoding="utf-8") as handle:
        return json.load(handle)


def main() -> int:
    failures: list[str] = []

    cli_package = load_json(ROOT / "cli" / "package.json")
    package_lock = load_json(ROOT / "cli" / "package-lock.json")
    skill = load_json(ROOT / "skill.json")
    plugin = load_json(ROOT / ".claude-plugin" / "plugin.json")
    marketplace = load_json(ROOT / ".claude-plugin" / "marketplace.json")

    expected_version = cli_package["version"]
    version_fields = {
        "skill.json": skill.get("version"),
        ".claude-plugin/plugin.json": plugin.get("version"),
        ".claude-plugin/marketplace.json metadata": marketplace.get("metadata", {}).get("version"),
        ".claude-plugin/marketplace.json plugin": marketplace.get("plugins", [{}])[0].get("version"),
        "cli/package-lock.json": package_lock.get("version"),
        "cli/package-lock.json packages root": package_lock.get("packages", {}).get("", {}).get("version"),
    }

    for label, version in version_fields.items():
        if version != expected_version:
            failures.append(f"{label} version is {version!r}, expected {expected_version!r}")

    description_targets = {
        "skill.json": skill.get("description", ""),
        ".claude-plugin/plugin.json": plugin.get("description", ""),
        ".claude-plugin/marketplace.json metadata": marketplace.get("metadata", {}).get("description", ""),
        ".claude-plugin/marketplace.json plugin": marketplace.get("plugins", [{}])[0].get("description", ""),
    }
    for label, description in description_targets.items():
        lowered = description.lower()
        if "product-site" not in lowered and "site architecture" not in lowered:
            failures.append(f"{label} description does not mention product-site/site architecture capability")

    if failures:
        print("Metadata validation failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print(f"Metadata aligned at version {expected_version}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
