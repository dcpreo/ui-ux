"""Phase 0 smoke tests — verify harness and core search imports."""

from core import detect_domain, search
from design_system import generate_design_system


def test_search_product_domain_returns_results():
    result = search("saas dashboard", domain="product")
    assert "error" not in result
    assert result["domain"] == "product"
    assert result["count"] >= 1
    assert "Product Type" in result["results"][0]


def test_detect_domain_auto_product():
    assert detect_domain("ecommerce saas fintech") == "product"


def test_design_system_generates_markdown():
    output = generate_design_system("fintech saas", project_name="Test App", output_format="markdown")
    assert "Test App" in output or "test-app" in output.lower()
    assert len(output) > 100
