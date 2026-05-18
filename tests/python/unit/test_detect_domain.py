"""Table-driven tests for detect_domain()."""

import pytest

from core import detect_domain


@pytest.mark.parametrize(
    "query,expected",
    [
        ("ecommerce saas fintech", "product"),
        ("saas dashboard admin", "product"),
        ("glassmorphism dark mode minimalism", "style"),
        ("color palette hex accent", "color"),
        ("bar chart trend visualization", "chart"),
        ("landing page hero cta conversion", "landing"),
        ("wcag accessibility keyboard focus", "ux"),
        # "font pairing" matches typography keywords; "serif" also scores google-fonts (wins today)
        ("font pairing heading body serif", "google-fonts"),
        ("typography pairing mood", "typography"),
        ("google font noto variable", "google-fonts"),
        ("lucide icon heroicons", "icons"),
        ("react useeffect suspense rerender", "react"),
        ("aria semantic form input", "web"),
        ("nextjs tailwind", "style"),  # weak signal → default style when no strong match
    ],
)
def test_detect_domain(query: str, expected: str):
    assert detect_domain(query) == expected
