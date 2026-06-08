import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SEARCH = ROOT / "src" / "ui-ux-pro-max" / "scripts" / "search.py"


def run_search(*args: str) -> str:
    result = subprocess.run(
        [sys.executable, str(SEARCH), *args],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return result.stdout


def run_search_result(*args: str) -> subprocess.CompletedProcess:
    return subprocess.run(
        [sys.executable, str(SEARCH), *args],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )


class SiteSystemCliTests(unittest.TestCase):
    def test_site_system_json_contract(self):
        output = run_search(
            "B2B SaaS analytics platform homepage pricing feature pages",
            "--site-system",
            "-f",
            "json",
            "-p",
            "Analytics SaaS",
        )
        payload = json.loads(output)

        self.assertEqual(payload["project_name"], "Analytics SaaS")
        self.assertEqual(payload["site_type"], "Product Marketing Site")
        self.assertIn({"page_family": "Homepage", "route": "/"}, payload["sitemap"])
        self.assertTrue(any(page["page_family"] == "Pricing" for page in payload["pages"]))
        self.assertTrue(all(page["claude_design_prompt"] for page in payload["pages"]))
        self.assertTrue(payload["global_qa"])

    def test_site_system_markdown_contract(self):
        output = run_search(
            "marketplace host guest booking trust safety website",
            "--site-system",
            "-p",
            "Host Marketplace",
        )

        self.assertIn("## Product Site System: Host Marketplace", output)
        self.assertIn("### Sitemap", output)
        self.assertIn("### Page Matrix", output)
        self.assertIn("### Claude Design Prompt Pack", output)
        self.assertIn("Marketplace Supply", output)

    def test_site_system_persistence(self):
        with tempfile.TemporaryDirectory() as tmp:
            output = run_search(
                "consumer wellness meditation sleep app website",
                "--site-system",
                "--persist",
                "-p",
                "Wellness App",
                "--output-dir",
                tmp,
            )
            base = Path(tmp) / "site-system" / "wellness-app"
            self.assertTrue((base / "SITE_SYSTEM.md").exists(), output)
            self.assertTrue((base / "pages" / "homepage.md").exists(), output)

    def test_site_system_persist_confirmation_matches_slug(self):
        with tempfile.TemporaryDirectory() as tmp:
            output = run_search(
                "B2B SaaS analytics platform website",
                "--site-system",
                "--persist",
                "-p",
                "A/B Test",
                "--output-dir",
                tmp,
            )
            self.assertIn("site-system/a-b-test/SITE_SYSTEM.md", output)
            self.assertTrue((Path(tmp) / "site-system" / "a-b-test" / "SITE_SYSTEM.md").exists(), output)

    def test_site_system_json_persist_keeps_stdout_parseable(self):
        with tempfile.TemporaryDirectory() as tmp:
            result = run_search_result(
                "B2B SaaS analytics platform website",
                "--site-system",
                "-f",
                "json",
                "--persist",
                "-p",
                "JSON Site",
                "--output-dir",
                tmp,
            )
            payload = json.loads(result.stdout)
            self.assertEqual(payload["project_name"], "JSON Site")
            self.assertIn("site-system/json-site/SITE_SYSTEM.md", result.stderr)

    def test_new_domains_search(self):
        output = run_search(
            "SaaS website pricing docs",
            "--domain",
            "site-architecture",
            "--json",
        )
        payload = json.loads(output)
        self.assertEqual(payload["domain"], "site-architecture")
        self.assertGreaterEqual(payload["count"], 1)

    def test_existing_design_system_markdown_still_works(self):
        output = run_search(
            "AI search tool modern minimal",
            "--design-system",
            "-f",
            "markdown",
            "-p",
            "AI Search",
        )
        self.assertIn("## Design System: AI Search", output)
        self.assertIn("### Colors", output)


if __name__ == "__main__":
    unittest.main()
