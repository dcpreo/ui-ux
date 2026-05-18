"""Integration tests for design-system persistence (Master + page overrides)."""

from pathlib import Path

from design_system import generate_design_system


def test_persist_creates_master_and_page_override(tmp_path):
    cwd = tmp_path / "project"
    cwd.mkdir()

    generate_design_system(
        "fintech saas",
        project_name="My App",
        output_format="markdown",
        persist=True,
        page="User Profile",
        output_dir=str(cwd),
    )

    base = cwd / "design-system" / "my-app"
    master = base / "MASTER.md"
    page = base / "pages" / "user-profile.md"

    assert master.is_file(), "MASTER.md should exist"
    assert page.is_file(), "page override should exist"

    master_text = master.read_text(encoding="utf-8")
    page_text = page.read_text(encoding="utf-8")

    assert "Design System Master File" in master_text
    assert "My App" in master_text or "my-app" in master_text.lower()
    assert "User Profile" in page_text or "user-profile" in page_text.lower()
