"""Golden tests for search() and search_stack() — update fixtures only when intentional."""

import json
from pathlib import Path

import pytest

from core import search, search_stack
from golden.normalize import normalize_search_result

FIXTURES_DIR = Path(__file__).parent / "fixtures"

GOLDEN_FIXTURES = sorted(p.name for p in FIXTURES_DIR.glob("*.json"))


@pytest.mark.golden
@pytest.mark.parametrize("fixture_name", GOLDEN_FIXTURES)
def test_search_matches_golden(fixture_name: str):
    spec = json.loads((FIXTURES_DIR / fixture_name).read_text(encoding="utf-8"))
    expected = spec["expected"]

    if "stack" in spec:
        actual = normalize_search_result(search_stack(spec["query"], spec["stack"]))
    elif "domain" in spec:
        actual = normalize_search_result(search(spec["query"], domain=spec["domain"]))
    else:
        actual = normalize_search_result(search(spec["query"]))

    assert actual == expected, (
        f"Golden mismatch for {fixture_name}. "
        "If ranking or CSV data changed intentionally, regenerate the fixture."
    )
