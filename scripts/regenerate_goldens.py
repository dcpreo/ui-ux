#!/usr/bin/env python3
"""Regenerate golden fixtures after intentional search or design-system changes."""

import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "src" / "ui-ux-pro-max" / "scripts"))
sys.path.insert(0, str(REPO_ROOT / "tests" / "python"))

from core import search, search_stack  # noqa: E402
from design_system import generate_design_system  # noqa: E402
from golden.normalize import normalize_search_result  # noqa: E402

FIXTURES = REPO_ROOT / "tests" / "python" / "golden" / "fixtures"
SNAPSHOTS = REPO_ROOT / "tests" / "python" / "golden" / "snapshots"


def main() -> None:
    FIXTURES.mkdir(parents=True, exist_ok=True)
    SNAPSHOTS.mkdir(parents=True, exist_ok=True)

    cases = [
        (
            "search_saas_dashboard_product.json",
            lambda: search("saas dashboard", domain="product"),
            {"query": "saas dashboard", "domain": "product"},
        ),
        (
            "search_glassmorphism_style.json",
            lambda: search("glassmorphism dark mode", domain="style"),
            {"query": "glassmorphism dark mode", "domain": "style"},
        ),
        (
            "search_chart_analytics.json",
            lambda: search("analytics dashboard trend", domain="chart"),
            {"query": "analytics dashboard trend", "domain": "chart"},
        ),
        (
            "search_stack_react_memo.json",
            lambda: search_stack("useCallback memo rerender", "react"),
            {"query": "useCallback memo rerender", "stack": "react"},
        ),
        (
            "search_auto_typography.json",
            lambda: search("font pairing serif editorial"),
            {"query": "font pairing serif editorial"},
        ),
    ]

    for fname, fn, meta in cases:
        payload = {**meta, "expected": normalize_search_result(fn())}
        (FIXTURES / fname).write_text(
            json.dumps(payload, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )
        print(f"updated {fname}")

    md = generate_design_system(
        "fintech saas",
        project_name="Golden App",
        output_format="markdown",
    )
    (SNAPSHOTS / "design_system_fintech_saas.md").write_text(md, encoding="utf-8")
    print("updated design_system_fintech_saas.md")
    print("Done. Run: pytest tests/python/golden -v")


if __name__ == "__main__":
    main()
