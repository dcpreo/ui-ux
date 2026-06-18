#!/usr/bin/env bash
# SessionStart hook — vendored/adapted from obra/superpowers.
#
# Injects the "using-superpowers" skill content as session context so the
# agent learns how to discover and use the skills in .claude/skills/ before
# responding. Unlike the upstream plugin hook (which relies on
# CLAUDE_PLUGIN_ROOT), this resolves the skill file relative to its own
# location, so it works for a plain vendored install.

set -euo pipefail

# Resolve the using-superpowers skill relative to this script:
#   .claude/hooks/superpowers-session-start.sh  ->  .claude/skills/using-superpowers/SKILL.md
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_FILE="${SCRIPT_DIR}/../skills/using-superpowers/SKILL.md"

using_superpowers_content=$(cat "$SKILL_FILE" 2>&1 || echo "Error reading using-superpowers skill at ${SKILL_FILE}")

# Escape a string for embedding in a JSON string value. Each ${s//old/new}
# is a single fast pass (no per-char loop).
escape_for_json() {
    local s="$1"
    s="${s//\\/\\\\}"
    s="${s//\"/\\\"}"
    s="${s//$'\n'/\\n}"
    s="${s//$'\r'/\\r}"
    s="${s//$'\t'/\\t}"
    printf '%s' "$s"
}

using_superpowers_escaped=$(escape_for_json "$using_superpowers_content")
session_context="<EXTREMELY_IMPORTANT>\nYou have superpowers.\n\n**Below is the full content of your 'using-superpowers' skill - your introduction to using skills. For all other skills, use the 'Skill' tool:**\n\n${using_superpowers_escaped}\n</EXTREMELY_IMPORTANT>"

# Claude Code reads hookSpecificOutput.additionalContext for SessionStart.
# printf (not heredoc) avoids the bash 5.3+ heredoc hang noted upstream.
printf '{\n  "hookSpecificOutput": {\n    "hookEventName": "SessionStart",\n    "additionalContext": "%s"\n  }\n}\n' "$session_context"

exit 0
