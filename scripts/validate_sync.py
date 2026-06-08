#!/usr/bin/env python3
"""Validate that packaged CLI assets match the canonical src skill assets."""

import filecmp
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
IGNORED_NAMES = {"__pycache__", ".DS_Store"}
IGNORED_SUFFIXES = {".pyc", ".pyo"}
PAIRS = [
    (ROOT / "src" / "ui-ux-pro-max" / "data", ROOT / "cli" / "assets" / "data"),
    (ROOT / "src" / "ui-ux-pro-max" / "scripts", ROOT / "cli" / "assets" / "scripts"),
    (ROOT / "src" / "ui-ux-pro-max" / "templates", ROOT / "cli" / "assets" / "templates"),
]


def ignored(path: Path) -> bool:
    return path.name in IGNORED_NAMES or path.suffix in IGNORED_SUFFIXES


def compare_dirs(left: Path, right: Path, failures: list[str]) -> None:
    if not left.exists() or not right.exists():
        failures.append(f"Missing directory: {left} or {right}")
        return

    left_entries = {path.name: path for path in left.iterdir() if not ignored(path)}
    right_entries = {path.name: path for path in right.iterdir() if not ignored(path)}

    for name in sorted(left_entries.keys() - right_entries.keys()):
        failures.append(f"Only in src: {left_entries[name]}")
    for name in sorted(right_entries.keys() - left_entries.keys()):
        failures.append(f"Only in cli/assets: {right_entries[name]}")

    for name in sorted(left_entries.keys() & right_entries.keys()):
        left_path = left_entries[name]
        right_path = right_entries[name]
        if left_path.is_dir() and right_path.is_dir():
            compare_dirs(left_path, right_path, failures)
        elif left_path.is_file() and right_path.is_file():
            if not filecmp.cmp(left_path, right_path, shallow=False):
                failures.append(f"Different file: {left_path} != {right_path}")
        else:
            failures.append(f"Type mismatch: {left_path} != {right_path}")


def main() -> int:
    failures: list[str] = []
    for left, right in PAIRS:
        compare_dirs(left, right, failures)

    if failures:
        print("Source/package asset drift detected:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("src/ui-ux-pro-max and cli/assets are synchronized.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
