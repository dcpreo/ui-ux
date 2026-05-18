"""Normalize API results for stable golden comparisons."""


def normalize_search_result(result: dict) -> dict:
    """Drop volatile fields; sort result row keys for deterministic JSON."""
    normalized = {
        "domain": result.get("domain"),
        "stack": result.get("stack"),
        "query": result.get("query"),
        "file": result.get("file"),
        "count": result.get("count"),
        "results": [],
    }
    for row in result.get("results", []):
        normalized["results"].append(dict(sorted(row.items())))
    return normalized
