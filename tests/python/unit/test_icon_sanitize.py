"""Tests for SVG sanitization in icon generator."""

import sys
from pathlib import Path

ICON_SCRIPT = (
    Path(__file__).resolve().parents[3]
    / ".claude"
    / "skills"
    / "design"
    / "scripts"
    / "icon"
)
sys.path.insert(0, str(ICON_SCRIPT))

from generate import sanitize_svg  # noqa: E402


def test_sanitize_svg_removes_script_and_handlers():
    dirty = (
        '<svg xmlns="http://www.w3.org/2000/svg" onclick="alert(1)">'
        "<script>alert('x')</script><rect width=\"10\" height=\"10\"/>"
        "</svg>"
    )
    clean = sanitize_svg(dirty)
    assert "<script" not in clean.lower()
    assert "onclick" not in clean.lower()
    assert "<rect" in clean
