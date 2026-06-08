#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Product Site System Generator.

Builds a multi-page website plan from product-site architecture, page-pattern,
section-pattern, and visual design-system recommendations.
"""

from __future__ import annotations

import csv
import json
import re
from datetime import datetime
from pathlib import Path

from core import DATA_DIR, search
from design_system import DesignSystemGenerator


PAGE_DOMAIN = "page-patterns"
SECTION_DOMAIN = "section-patterns"
SITE_DOMAIN = "site-architecture"

SECTION_ALIASES = {
    "benefit grid": "Feature Grid",
    "earnings/outcome proof": "Outcome Proof",
    "featured listings": "Feature Grid",
    "policy proof": "Trust Block",
    "process steps": "How It Works",
    "quote block": "Social Proof",
    "related features": "Feature Grid",
    "roi proof": "Outcome Proof",
    "search/discovery preview": "App Preview",
    "security notes": "Trust Block",
    "solution story": "Workflow Steps",
    "timeline": "Workflow Steps",
    "trust pillars": "Trust Block"
}


def slugify(value: str) -> str:
    """Convert a label into a stable lowercase slug."""
    value = re.sub(r"[^a-zA-Z0-9]+", "-", str(value).strip().lower())
    return value.strip("-") or "page"


def split_list(value: str) -> list[str]:
    """Split semicolon/comma/greater-than separated CSV fields into clean items."""
    if not value:
        return []
    parts = re.split(r"\s*(?:;|>|,)\s*", value)
    return [part.strip() for part in parts if part.strip()]


def load_csv(filename: str) -> list[dict]:
    """Load a bundled CSV file."""
    filepath = DATA_DIR / filename
    if not filepath.exists():
        return []
    with open(filepath, "r", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def first_result(result: dict) -> dict:
    """Return the first search result or an empty dict."""
    rows = result.get("results", [])
    return rows[0] if rows else {}


def find_exact_row(filename: str, field: str, value: str) -> dict:
    """Find a row by exact case-insensitive field match."""
    value_lower = value.strip().lower()
    for row in load_csv(filename):
        if row.get(field, "").strip().lower() == value_lower:
            return row
    return {}


def normalize_requested_pages(site_pages: str | None) -> list[str]:
    """Parse optional page-family list supplied by the caller."""
    if not site_pages:
        return []
    return split_list(site_pages.replace("|", ";"))


class SiteSystemGenerator:
    """Generate a product website system from search-domain recommendations."""

    def __init__(self):
        self.design_generator = DesignSystemGenerator()

    def generate(self, query: str, project_name: str | None = None, site_pages: str | None = None) -> dict:
        """Generate the site-system recommendation dictionary."""
        architecture = first_result(search(query, SITE_DOMAIN, 1))
        if not architecture:
            architecture = {
                "Site Type": "Product Marketing Site",
                "Required Page Families": "Homepage; Feature Overview; Feature Detail; Pricing; Use Case",
                "Optional Page Families": "Blog/Resource; About",
                "Primary Navigation": "Product; Solutions; Resources; Pricing; Company",
                "Conversion Journey": "Visitor understands value > reviews proof > compares fit > starts trial or contacts sales",
                "Proof/Evidence Model": "Screenshots; testimonials; quantified outcomes; trust notes",
                "Content/SEO Model": "Feature and use-case pages target concrete user jobs",
                "Anti-Patterns": "Generic one-page sites for complex products; unsupported claims"
            }

        visual_system = self.design_generator.generate(query, project_name)
        page_families = normalize_requested_pages(site_pages)
        if not page_families:
            page_families = split_list(architecture.get("Required Page Families", ""))
            page_families.extend(split_list(architecture.get("Optional Page Families", ""))[:2])

        pages = [self._build_page(query, page_family, visual_system) for page_family in page_families]

        return {
            "project_name": project_name or query.title(),
            "query": query,
            "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "site_type": architecture.get("Site Type", "Product Marketing Site"),
            "navigation": split_list(architecture.get("Primary Navigation", "")),
            "conversion_journey": architecture.get("Conversion Journey", ""),
            "proof_model": split_list(architecture.get("Proof/Evidence Model", "")),
            "content_model": architecture.get("Content/SEO Model", ""),
            "anti_patterns": split_list(architecture.get("Anti-Patterns", "")),
            "visual_system": self._summarize_visual_system(visual_system),
            "sitemap": [{"page_family": page["page_family"], "route": page["route"]} for page in pages],
            "pages": pages,
            "global_qa": [
                "Every product, customer, metric, certification, and policy claim is sourced or marked as a placeholder.",
                "Primary navigation fits mobile and desktop without wrapping into ambiguous labels.",
                "Each page has one H1, one primary CTA path, visible focus states, and responsive layouts at 375px, 768px, 1024px, and 1440px.",
                "Reduced-motion behavior is defined for animated sections and product previews.",
                "Internal links connect homepage, feature, pricing, use-case, trust, and resource pages into a coherent evaluation journey."
            ]
        }

    def _build_page(self, query: str, page_family: str, visual_system: dict) -> dict:
        """Build one page-family recommendation."""
        exact = find_exact_row("page-patterns.csv", "Page Family", page_family)
        page = exact or first_result(search(f"{query} {page_family}", PAGE_DOMAIN, 1))
        if not page:
            page = {
                "Page Family": page_family,
                "Route Pattern": f"/{slugify(page_family)}",
                "Job To Be Done": "Help the visitor understand this page's role in the product journey.",
                "Required Sections": "Page Hero; Feature Grid; Outcome Proof; CTA Band",
                "Optional Sections": "FAQ",
                "Primary CTA": "Continue",
                "Evidence Required": "Relevant product facts and proof points",
                "Internal Links": "Homepage; Pricing",
                "Claude Design Prompt Notes": "Keep the page specific to the user job and product evidence.",
                "QA Checks": "H1 is specific; CTA is clear; proof is not invented"
            }

        required_sections = split_list(page.get("Required Sections", ""))
        optional_sections = split_list(page.get("Optional Sections", ""))
        section_guidance = [self._build_section(query, section_name) for section_name in required_sections]

        page_summary = {
            "page_family": page.get("Page Family", page_family),
            "route": page.get("Route Pattern", f"/{slugify(page_family)}"),
            "job_to_be_done": page.get("Job To Be Done", ""),
            "required_sections": required_sections,
            "optional_sections": optional_sections,
            "section_guidance": section_guidance,
            "primary_cta": page.get("Primary CTA", ""),
            "evidence_required": split_list(page.get("Evidence Required", "")),
            "internal_links": split_list(page.get("Internal Links", "")),
            "qa_checks": split_list(page.get("QA Checks", "")),
            "prompt_notes": page.get("Claude Design Prompt Notes", "")
        }
        page_summary["claude_design_prompt"] = self._build_claude_design_prompt(query, page_summary, visual_system)
        return page_summary

    def _build_section(self, query: str, section_name: str) -> dict:
        """Resolve section guidance by exact row first, then search fallback."""
        canonical_name = SECTION_ALIASES.get(section_name.lower(), section_name)
        exact = find_exact_row("section-patterns.csv", "Section Intent", canonical_name)
        section = exact or first_result(search(f"{query} {canonical_name}", SECTION_DOMAIN, 1))
        if not section:
            section = {
                "Section Intent": section_name,
                "Layout Pattern": "Responsive content block",
                "Use When": "This page needs the section's intent",
                "Avoid When": "The section would repeat unsupported or generic claims",
                "Copy Inputs": "Specific product facts",
                "Visual Assets": "Relevant product image or diagram",
                "Interaction Notes": "Keep interactions keyboard accessible",
                "Accessibility Checks": "Headings are ordered and contrast passes"
            }

        return {
            "requested_section": section_name,
            "section": section.get("Section Intent", section_name),
            "layout_pattern": section.get("Layout Pattern", ""),
            "use_when": section.get("Use When", ""),
            "avoid_when": section.get("Avoid When", ""),
            "copy_inputs": split_list(section.get("Copy Inputs", "")),
            "visual_assets": section.get("Visual Assets", ""),
            "interaction_notes": section.get("Interaction Notes", ""),
            "accessibility_checks": split_list(section.get("Accessibility Checks", ""))
        }

    def _summarize_visual_system(self, visual_system: dict) -> dict:
        """Extract the visual decisions that site prompts need."""
        pattern = visual_system.get("pattern", {})
        style = visual_system.get("style", {})
        colors = visual_system.get("colors", {})
        typography = visual_system.get("typography", {})
        return {
            "category": visual_system.get("category", "General"),
            "pattern": pattern.get("name", ""),
            "style": style.get("name", ""),
            "style_keywords": style.get("keywords", ""),
            "colors": {
                "primary": colors.get("primary", ""),
                "accent": colors.get("accent", ""),
                "background": colors.get("background", ""),
                "foreground": colors.get("foreground", "")
            },
            "typography": {
                "heading": typography.get("heading", ""),
                "body": typography.get("body", "")
            },
            "effects": visual_system.get("key_effects", ""),
            "anti_patterns": visual_system.get("anti_patterns", "")
        }

    def _build_claude_design_prompt(self, query: str, page: dict, visual_system: dict) -> str:
        """Create one concise Claude Design-ready page prompt."""
        style = visual_system.get("style", {})
        colors = visual_system.get("colors", {})
        typography = visual_system.get("typography", {})
        sections = "; ".join(page.get("required_sections", []))
        evidence = "; ".join(page.get("evidence_required", []))
        return (
            f"Create the {page['page_family']} page for {query}. "
            f"Route: {page['route']}. Job: {page['job_to_be_done']} "
            f"Use visual direction: {style.get('name', 'Minimalism')} with "
            f"{typography.get('heading', 'Inter')} headings, {typography.get('body', 'Inter')} body text, "
            f"primary {colors.get('primary', '#2563EB')}, accent {colors.get('accent', '#F97316')}, "
            f"background {colors.get('background', '#F8FAFC')}. "
            f"Required sections: {sections}. Primary CTA: {page.get('primary_cta', '')}. "
            f"Evidence needed: {evidence}. {page.get('prompt_notes', '')} "
            "Do not invent customer logos, metrics, medical claims, certifications, screenshots, or policy promises. "
            "Use clearly marked placeholders when facts are missing. Include desktop and mobile responsive states, "
            "visible focus states, accessible headings, reduced-motion handling, and realistic empty/error states where relevant."
        )


def format_markdown(site_system: dict) -> str:
    """Format site system as Markdown."""
    lines = []
    lines.append(f"## Product Site System: {site_system['project_name']}")
    lines.append("")
    lines.append(f"- **Site Type:** {site_system['site_type']}")
    lines.append(f"- **Query:** {site_system['query']}")
    lines.append(f"- **Generated:** {site_system['generated_at']}")
    lines.append(f"- **Navigation:** {' / '.join(site_system['navigation'])}")
    lines.append(f"- **Conversion Journey:** {site_system['conversion_journey']}")
    lines.append("")

    visual = site_system["visual_system"]
    lines.append("### Visual System")
    lines.append(f"- **Pattern:** {visual.get('pattern', '')}")
    lines.append(f"- **Style:** {visual.get('style', '')}")
    lines.append(f"- **Typography:** {visual['typography'].get('heading', '')} / {visual['typography'].get('body', '')}")
    lines.append(f"- **Colors:** primary `{visual['colors'].get('primary', '')}`, accent `{visual['colors'].get('accent', '')}`, background `{visual['colors'].get('background', '')}`")
    if visual.get("effects"):
        lines.append(f"- **Effects:** {visual['effects']}")
    lines.append("")

    lines.append("### Sitemap")
    lines.append("| Page Family | Route |")
    lines.append("|-------------|-------|")
    for item in site_system["sitemap"]:
        lines.append(f"| {item['page_family']} | `{item['route']}` |")
    lines.append("")

    lines.append("### Page Matrix")
    for page in site_system["pages"]:
        lines.append(f"#### {page['page_family']} (`{page['route']}`)")
        lines.append(f"- **JTBD:** {page['job_to_be_done']}")
        lines.append(f"- **Primary CTA:** {page['primary_cta']}")
        lines.append(f"- **Required Sections:** {' > '.join(page['required_sections'])}")
        if page["optional_sections"]:
            lines.append(f"- **Optional Sections:** {'; '.join(page['optional_sections'])}")
        if page["evidence_required"]:
            lines.append(f"- **Evidence Required:** {'; '.join(page['evidence_required'])}")
        if page["internal_links"]:
            lines.append(f"- **Internal Links:** {'; '.join(page['internal_links'])}")
        if page["qa_checks"]:
            lines.append(f"- **QA Checks:** {'; '.join(page['qa_checks'])}")
        lines.append("")
        lines.append("**Section Guidance**")
        for section in page["section_guidance"]:
            label = section["section"]
            if section.get("requested_section") and section["requested_section"] != section["section"]:
                label = f"{section['requested_section']} -> {section['section']}"
            lines.append(f"- **{label}:** {section['layout_pattern']} Use when: {section['use_when']}")
        lines.append("")

    lines.append("### Claude Design Prompt Pack")
    for page in site_system["pages"]:
        lines.append(f"#### {page['page_family']}")
        lines.append("```text")
        lines.append(page["claude_design_prompt"])
        lines.append("```")
        lines.append("")

    lines.append("### Proof And QA Gates")
    if site_system["proof_model"]:
        lines.append(f"- **Proof Model:** {'; '.join(site_system['proof_model'])}")
    if site_system["content_model"]:
        lines.append(f"- **Content/SEO Model:** {site_system['content_model']}")
    if site_system["anti_patterns"]:
        lines.append(f"- **Avoid:** {'; '.join(site_system['anti_patterns'])}")
    for item in site_system["global_qa"]:
        lines.append(f"- [ ] {item}")
    lines.append("")
    return "\n".join(lines)


def persist_site_system(site_system: dict, output_dir: str | None = None) -> dict:
    """Persist site system to site-system/<project>/ with page prompt files."""
    base_dir = Path(output_dir) if output_dir else Path.cwd()
    project_slug = slugify(site_system.get("project_name", "default"))
    system_dir = base_dir / "site-system" / project_slug
    pages_dir = system_dir / "pages"
    system_dir.mkdir(parents=True, exist_ok=True)
    pages_dir.mkdir(parents=True, exist_ok=True)

    created_files = []
    master_file = system_dir / "SITE_SYSTEM.md"
    master_file.write_text(format_markdown(site_system), encoding="utf-8")
    created_files.append(str(master_file))

    for page in site_system["pages"]:
        page_file = pages_dir / f"{slugify(page['page_family'])}.md"
        lines = [
            f"# {page['page_family']} Page Prompt",
            "",
            f"**Route:** `{page['route']}`",
            f"**JTBD:** {page['job_to_be_done']}",
            "",
            "## Claude Design Prompt",
            "",
            "```text",
            page["claude_design_prompt"],
            "```",
            "",
            "## QA Checks",
            "",
        ]
        lines.extend(f"- [ ] {item}" for item in page["qa_checks"])
        page_file.write_text("\n".join(lines), encoding="utf-8")
        created_files.append(str(page_file))

    return {"status": "success", "site_system_dir": str(system_dir), "created_files": created_files}


def generate_site_system(
    query: str,
    project_name: str | None = None,
    output_format: str = "markdown",
    persist: bool = False,
    site_pages: str | None = None,
    output_dir: str | None = None
) -> str:
    """Generate and format a product site system."""
    generator = SiteSystemGenerator()
    site_system = generator.generate(query, project_name, site_pages)

    if persist:
        persist_site_system(site_system, output_dir)

    if output_format == "json":
        return json.dumps(site_system, indent=2, ensure_ascii=False)
    return format_markdown(site_system)
