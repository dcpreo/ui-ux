"""Shared pytest fixtures for UI/UX Pro Max Python scripts."""

from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parents[2]
SCRIPTS_DIR = REPO_ROOT / "src" / "ui-ux-pro-max" / "scripts"
DATA_DIR = REPO_ROOT / "src" / "ui-ux-pro-max" / "data"


@pytest.fixture(scope="session")
def repo_root() -> Path:
    return REPO_ROOT


@pytest.fixture(scope="session")
def scripts_dir() -> Path:
    assert SCRIPTS_DIR.is_dir(), f"Missing scripts dir: {SCRIPTS_DIR}"
    return SCRIPTS_DIR


@pytest.fixture(scope="session")
def data_dir() -> Path:
    assert DATA_DIR.is_dir(), f"Missing data dir: {DATA_DIR}"
    return DATA_DIR
