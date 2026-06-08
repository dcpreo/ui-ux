#!/usr/bin/env python3
"""Validate generated-skill template path contracts."""

import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = ROOT / "src" / "ui-ux-pro-max" / "templates" / "base" / "skill-content.md"
PLATFORMS = ROOT / "src" / "ui-ux-pro-max" / "templates" / "platforms"


def load_json(path: Path) -> dict:
    with open(path, "r", encoding="utf-8") as handle:
        return json.load(handle)


def main() -> int:
    failures: list[str] = []
    template = TEMPLATE.read_text(encoding="utf-8")

    if "{{SCRIPT_PATH}}" not in template:
        failures.append("base template does not use {{SCRIPT_PATH}}")
    if "python3 skills/ui-ux-pro-max/scripts/search.py" in template:
        failures.append("base template still hardcodes skills/ui-ux-pro-max path")
    if "--domain prompt" in template or "| `prompt` |" in template:
        failures.append("base template still advertises unsupported prompt domain")
    if "--site-system" not in template:
        failures.append("base template does not advertise --site-system")

    for path in sorted(PLATFORMS.glob("*.json")):
        config = load_json(path)
        skill_path = config["folderStructure"]["skillPath"]
        expected_script = f"{skill_path}/scripts/search.py"
        if config.get("scriptPath") != expected_script:
            failures.append(f"{path.name} scriptPath is {config.get('scriptPath')!r}, expected {expected_script!r}")

    if failures:
        print("Template validation failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Template path contract is valid.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
