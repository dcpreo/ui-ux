#!/usr/bin/env python3
"""Validate generated installs render executable local script paths."""

import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CLI = ROOT / "cli" / "dist" / "index.js"
PLATFORM_DIR = ROOT / "src" / "ui-ux-pro-max" / "templates" / "platforms"
AI_TO_PLATFORM = {
    "claude": "claude",
    "codex": "codex",
    "copilot": "copilot",
    "kiro": "kiro",
}


def load_platform(name: str) -> dict:
    with open(PLATFORM_DIR / f"{name}.json", "r", encoding="utf-8") as handle:
        return json.load(handle)


def run(command: list[str], cwd: Path) -> subprocess.CompletedProcess:
    return subprocess.run(command, cwd=cwd, check=True, capture_output=True, text=True)


def main() -> int:
    failures: list[str] = []
    if not CLI.exists():
        print(f"Built CLI not found: {CLI}")
        return 1

    temp_root = Path(tempfile.mkdtemp(prefix="uipro-install-validation."))
    try:
        for ai_type, platform_name in AI_TO_PLATFORM.items():
            config = load_platform(platform_name)
            project_dir = temp_root / ai_type
            project_dir.mkdir(parents=True)

            try:
                run(["node", str(CLI), "init", "-a", ai_type, "-f"], project_dir)
            except subprocess.CalledProcessError as error:
                failures.append(f"{ai_type}: install failed: {error.stderr.strip()}")
                continue

            root = config["folderStructure"]["root"]
            skill_path = config["folderStructure"]["skillPath"]
            filename = config["folderStructure"]["filename"]
            expected_script = Path(root) / config["scriptPath"]
            skill_file = project_dir / root / skill_path / filename
            script_file = project_dir / expected_script

            if not skill_file.exists():
                failures.append(f"{ai_type}: missing generated skill file {skill_file}")
                continue
            if not script_file.exists():
                failures.append(f"{ai_type}: missing generated script {script_file}")
                continue

            content = skill_file.read_text(encoding="utf-8")
            rendered_command = f"python3 {expected_script.as_posix()}"
            if rendered_command not in content:
                failures.append(f"{ai_type}: generated instructions do not include {rendered_command}")
                continue

            try:
                run(["python3", expected_script.as_posix(), "minimalism", "--domain", "style"], project_dir)
            except subprocess.CalledProcessError as error:
                failures.append(f"{ai_type}: rendered script path failed: {error.stderr.strip()}")

    finally:
        shutil.rmtree(temp_root, ignore_errors=True)

    if failures:
        print("Generated install validation failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Generated install script paths are executable for Claude, Codex, Copilot, and Kiro.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
