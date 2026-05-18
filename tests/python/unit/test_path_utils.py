"""Tests for path_utils safe_slug and resolve_under_base."""

import pytest
from pathlib import Path

from path_utils import PathTraversalError, resolve_under_base, safe_slug, validate_name_input


def test_safe_slug_normalizes_spaces():
    assert safe_slug("My App") == "my-app"


def test_safe_slug_strips_unsafe_characters():
    assert safe_slug("foo@bar!") == "foo-bar"


def test_validate_name_input_rejects_traversal():
    with pytest.raises(PathTraversalError):
        validate_name_input("../../../outside", "page")


def test_safe_slug_empty_uses_default():
    assert safe_slug("") == "default"
    assert safe_slug("---") == "default"


def test_resolve_under_base_allows_nested(tmp_path):
    base = tmp_path / "root"
    base.mkdir()
    target = resolve_under_base(base, "design-system", "my-app")
    assert target == (base / "design-system" / "my-app").resolve()


def test_resolve_under_base_rejects_traversal(tmp_path):
    base = tmp_path / "root"
    base.mkdir()
    with pytest.raises(PathTraversalError):
        resolve_under_base(base, "..", "outside")
