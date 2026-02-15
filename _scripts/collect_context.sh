#!/bin/bash

# Configuration
PROJECT_DIR=${1:-$(pwd)}
OUTPUT_FILE=${2:-"context.xml"}

# Ensure strict mode
set -euo pipefail

echo "Collecting context from: $PROJECT_DIR"

# Header
echo "<project_context>" > "$OUTPUT_FILE"

# Find all relevant files (TS, TSX, CSS, JSON, HTML, MD)
# Excludes: node_modules, .git, dist, package-lock.json (noise), artifacts
find "$PROJECT_DIR" -type f \
    \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.json" -o -name "*.html" -o -name "*.md" \) \
    -not -path "*/node_modules/*" \
    -not -path "*/.git/*" \
    -not -path "*/dist/*" \
    -not -path "*/.gemini/*" \
    -not -name "package-lock.json" \
    -not -name "*error.log" \
    | while read file; do
    
    # Relative path for the tag
    rel_path="${file#$PROJECT_DIR/}"
    
    echo "  <file path=\"$rel_path\">" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
    echo "  </file>" >> "$OUTPUT_FILE"
done

# Footer
echo "</project_context>" >> "$OUTPUT_FILE"

echo "Context collected in $OUTPUT_FILE"
