"""Security tests: persist must not write outside design-system jail."""

import pytest

from design_system import generate_design_system
from path_utils import PathTraversalError


def test_persist_rejects_traversal_page_name(tmp_path):
    cwd = tmp_path / "project"
    cwd.mkdir()

    with pytest.raises(PathTraversalError):
        generate_design_system(
            "fintech saas",
            project_name="My App",
            output_format="markdown",
            persist=True,
            page="../../../outside",
            output_dir=str(cwd),
        )

    assert not (tmp_path / "outside.md").exists()
    assert not list(cwd.glob("design-system/**/pages/*.md"))
    assert not list(cwd.glob("design-system/**/MASTER.md"))


def test_persist_valid_paths_unchanged(tmp_path):
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

    page = cwd / "design-system" / "my-app" / "pages" / "user-profile.md"
    assert page.is_file()
