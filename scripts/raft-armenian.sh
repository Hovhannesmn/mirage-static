#!/bin/bash
#
# RAFT Loop — Review Armenian text, Fix, Test
#
# Iteratively improves Armenian (Eastern Armenian) text across the project
# by sending it to Claude for linguistic review and applying corrections.
#
# Usage:
#   ./scripts/raft-armenian.sh              # Review only — shows issues
#   ./scripts/raft-armenian.sh --apply      # Review + apply fixes
#   ./scripts/raft-armenian.sh --apply -n3  # Run 3 iterations (default: 1)
#
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPORT_DIR="$PROJECT_ROOT/scripts/.raft-reports"
mkdir -p "$REPORT_DIR"

# Files containing Armenian text
ARMENIAN_FILES=(
  "$PROJECT_ROOT/index.html"
  "$PROJECT_ROOT/product.html"
  "$PROJECT_ROOT/js/data.js"
)

APPLY=false
ITERATIONS=1

for arg in "$@"; do
  case "$arg" in
    --apply) APPLY=true ;;
    -n*) ITERATIONS="${arg#-n}" ;;
  esac
done

# ── Step 1: Extract Armenian text with file/line context ──────────────
extract_armenian() {
  local tmpfile="$REPORT_DIR/armenian-text-$(date +%s).txt"

  node -e "
    const fs = require('fs');
    const files = $(printf '"%s",' "${ARMENIAN_FILES[@]}" | sed 's/,$//' | sed 's/^/[/;s/$/]/');
    const armenianRe = /[\u0530-\u058F]/;
    const unicodeEscRe = /\\\\u0[5][3-8][0-9a-fA-F]/;
    const stripHtml = s => s.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/ +/g, ' ').trim();

    files.forEach(f => {
      const fname = f.split('/').pop();
      const lines = fs.readFileSync(f, 'utf8').split('\n');
      let out = '=== FILE: ' + fname + ' ===\n';
      let found = false;
      lines.forEach((line, i) => {
        if (armenianRe.test(line) || unicodeEscRe.test(line)) {
          let display = line;
          // Decode JS unicode escapes for readability
          if (unicodeEscRe.test(line) && !armenianRe.test(line)) {
            try {
              display = line.replace(/\\\\u([0-9a-fA-F]{4})/g, (m, code) =>
                String.fromCharCode(parseInt(code, 16))
              );
            } catch(e) {}
          }
          // Strip HTML tags to show only text content
          const cleaned = stripHtml(display.trim());
          if (cleaned.length > 0) {
            out += 'L' + (i + 1) + ': ' + cleaned + '\n';
            found = true;
          }
        }
      });
      if (!found) out += '(no Armenian text found)\n';
      out += '\n';
      fs.appendFileSync('$tmpfile', out);
    });
  "

  echo "$tmpfile"
}

# ── Step 2: Build the review prompt ──────────────────────────────────
REVIEW_PROMPT='You are a native Eastern Armenian language expert reviewing a website for "Mirage Handmade" — an Armenian papier-mache crafts business based in Armenia.

TASK: Review all Armenian text below for linguistic correctness and natural phrasing.

CHECK FOR:
1. SPELLING ERRORS — misspelled Armenian words
2. GRAMMAR — incorrect verb forms, case endings, agreement
3. WRONG WORD CHOICE — words that do not fit the context or sound unnatural
4. UNNATURAL PHRASING — text that sounds machine-translated or awkward to a native Armenian speaker
5. MIXED SCRIPT — Armenian characters mixed with Latin where they should not be
6. BROKEN TEXT — missing words, extra spaces, garbled characters (e.g. Latin "I" where an Armenian word should be)
7. PUNCTUATION — Armenian uses the colon-like vertsaket, not periods, for sentence endings. Check pause marks too.
8. CONSISTENCY — Eastern Armenian throughout (not Western Armenian forms)

IMPORTANT RULES:
- The site targets Armenian-speaking audience, so ALL user-facing Armenian must be natural and correct
- Eastern Armenian is the standard (spoken in Republic of Armenia)
- Product names can be creative/brand-specific — only flag if clearly wrong
- The Armenian transliteration of "papier-mache" is acceptable as-is
- Prices in AMD are correct as-is
- Pay special attention to: missing words, Latin characters mixed into Armenian text, and unnatural sentence structure

OUTPUT FORMAT — for each issue, output EXACTLY:

ISSUE:
  FILE: <filename>
  LINE: <line_number>
  CURRENT: <exact current text on that line>
  FIXED: <corrected text for that line>
  REASON: <brief explanation in English>

If no issues found in a file, output: NO ISSUES: <filename>

After all issues, output a summary:

SUMMARY:
  TOTAL_ISSUES: <count>
  CRITICAL: <count of broken/missing text>
  GRAMMAR: <count>
  STYLE: <count of unnatural phrasing>

Here is the text to review:

'

# ── Step 3: Run review via Claude CLI ────────────────────────────────
run_review() {
  local iteration=$1
  local extracted=$2
  local report="$REPORT_DIR/review-$(date +%Y%m%d-%H%M%S)-iter${iteration}.md"

  echo "" >&2
  echo "=== RAFT Iteration $iteration ===" >&2
  echo "Extracting Armenian text..." >&2

  local prompt="${REVIEW_PROMPT}$(cat "$extracted")"

  echo "Sending to Claude for review..." >&2
  echo "$prompt" | claude -p --output-format text > "$report" 2>/dev/null

  echo "Review saved: $report" >&2
  echo "" >&2
  cat "$report" >&2
  echo "" >&2

  # Return report path on stdout
  echo "$report"
}

# ── Step 4: Apply fixes via Claude CLI ───────────────────────────────
apply_fixes() {
  local review_report=$1

  echo "" >&2
  echo "Applying fixes..." >&2

  local apply_prompt="You are editing files in the project at $PROJECT_ROOT.

Based on the review below, fix ALL Armenian text issues found. For each file that needs changes:
1. Read the current file
2. Apply the corrections from the review
3. Write the fixed file

IMPORTANT:
- Only change the Armenian text identified in the review
- Do NOT change HTML structure, CSS, JavaScript logic, or English text
- Preserve exact formatting and indentation
- If a fix involves inserting a missing Armenian word, use the correct Eastern Armenian form
- Use the Edit tool to make targeted changes, not full file rewrites

Here is the review:
$(cat "$review_report")

Fix all the issues listed above in the project files. After fixing, briefly list what you changed."

  echo "$apply_prompt" | claude -p --output-format text --allowedTools 'Edit,Read,Write,Bash(node:*)' 2>/dev/null

  echo "" >&2
  echo "Fixes applied." >&2
}

# ── Main RAFT loop ───────────────────────────────────────────────────
echo "RAFT Loop — Armenian Text Improvement"
echo "Project: $PROJECT_ROOT"
echo "Mode: $([ "$APPLY" = true ] && echo 'Review + Apply' || echo 'Review only')"
echo "Iterations: $ITERATIONS"
echo "Files: ${ARMENIAN_FILES[*]##*/}"
echo "------------------------------------"

for ((i = 1; i <= ITERATIONS; i++)); do
  extracted=$(extract_armenian)
  report=$(run_review "$i" "$extracted")

  if [ "$APPLY" = true ]; then
    apply_fixes "$report"
    echo ""
    echo "Iteration $i complete. Changes applied."
  else
    echo ""
    echo "Iteration $i complete. Run with --apply to fix issues."
  fi

  # Clean up temp extraction
  rm -f "$extracted"
done

echo ""
echo "===================================="
echo "RAFT complete. Reports saved in: $REPORT_DIR/"
echo ""
echo "Next steps:"
echo "  ./scripts/raft-armenian.sh --apply     # Apply fixes"
echo "  ./scripts/raft-armenian.sh --apply -n3 # Run 3 improvement rounds"
echo "  git diff                               # Review changes before commit"
