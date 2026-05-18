.PHONY: test test-python test-cli test-golden install-test-deps

# Run all automated tests (Python + CLI)
test: test-python test-cli

test-python:
	pytest tests/python -v

test-cli:
	bun test tests/cli

# Golden / characterization suite (Phase 1+)
test-golden:
	pytest tests/python/golden -v

install-test-deps:
	pip install -e ".[test]"
