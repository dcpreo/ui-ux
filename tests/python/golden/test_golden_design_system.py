"""Golden snapshot for generate_design_system markdown output."""

from pathlib import Path

import pytest

from design_system import generate_design_system

SNAPSHOT = Path(__file__).parent / "snapshots" / "design_system_fintech_saas.md"


@pytest.mark.golden
def test_design_system_markdown_matches_snapshot():
    actual = generate_design_system(
        "fintech saas",
        project_name="Golden App",
        output_format="markdown",
    )
    expected = SNAPSHOT.read_text(encoding="utf-8")
    assert actual == expected, (
        "Design system markdown snapshot mismatch. "
        "Regenerate tests/python/golden/snapshots/design_system_fintech_saas.md if intentional."
    )
