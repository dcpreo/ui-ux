#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Safe path helpers for design-system persistence."""

import re
from pathlib import Path

_SLUG_PATTERN = re.compile(r"[^a-z0-9]+")


class PathTraversalError(ValueError):
    """Raised when a resolved path would escape its base directory."""


def validate_name_input(value: str | None, label: str) -> None:
    """Reject names that include path separators or parent-directory segments."""
    if value is None:
        return
    raw = str(value)
    if ".." in raw or "/" in raw or "\\" in raw:
        raise PathTraversalError(
            f"Invalid {label}: must not contain path separators or '..' (got {value!r})"
        )


def safe_slug(value: str | None, *, default: str = "default", max_length: int = 64) -> str:
    """
  Normalize user-provided names to a safe directory/file slug.

  Keeps only a-z, 0-9, and single hyphens. Empty or invalid input uses default.
  """
    if value is None:
        return default
    raw = str(value).strip().lower()
    if not raw:
        return default
    slug = _SLUG_PATTERN.sub("-", raw)
    slug = re.sub(r"-+", "-", slug).strip("-")
    if not slug:
        return default
    if len(slug) > max_length:
        slug = slug[:max_length].rstrip("-")
    return slug or default


def resolve_under_base(base: Path, *parts: str) -> Path:
    """
    Resolve path parts under base; reject traversal outside base.

    Args:
        base: Directory that resolved paths must stay within
        *parts: Path segments (no path separators required in each part)

    Raises:
        PathTraversalError: If resolved path is not under base
    """
    base_resolved = Path(base).resolve()
    target = base_resolved.joinpath(*parts).resolve()
    try:
        target.relative_to(base_resolved)
    except ValueError as exc:
        raise PathTraversalError(
            f"Path escapes allowed directory: {target} is outside {base_resolved}"
        ) from exc
    return target
