# Autonomous Software Engineering Engine (n8n + Gemini 3 Pro)

This document outlines the architecture for the "Personal Aura" engine.

## 1. The Master Template (`_BASE_STACK_V4`)
This directory (`c:\Agencia\newTemplate`) acts as the "Warm Cache".
- **Stack**: Vite + React 19 + Tailwind v4 + Framer Motion.
- **State**: Pre-installed (`node_modules` present), ready for zero-latency cloning.

## 2. n8n Workflow Architecture

### Phase A: Context Collection
Instead of reading files individually, use the "Collector Script" to dump the entire codebase into an XML block.

**Step**: Execute Command
```bash
# Linux/Docker
./_scripts/collect_context.sh /proyectos/slug
```
```powershell
# Windows
./_scripts/collect_context.ps1 -ProjectDir "C:\Projects\Slug"
```

### Phase B: Dual-Core Reasoning (Architect + Builder)

**Step 1: The Architect (Planner)**
*Takes the context & client brief to design the strategy.*
- **System Prompt**: `ARCHITECT_PROMPT.md`
- **Input**: `<project_context>`, Client JSON, "The Arsenal" (Inventory).
- **Output**: JSON "Blueprint" (Selected features, Vibe, Section Order).

**Step 2: The Builder (Coder)**
*Takes the Blueprint and writes the code.*
- **System Prompt**: `SYSTEM_PROMPT.md`
- **Input**: `<project_context>`, `{{ $node["Architect"].json["architecture"] }}`.
- **Output**: JSON with `files` [{path, content}].

### Phase C: Injection (Materialization)
*Turns the JSON code into actual files on disk.*

**Step 3: The Injector (n8n Node)**
1.  **Save Output**: Save the Builder's JSON to a temporary file (e.g., `update_payload.json`).
2.  **Run Script**: Execute the helper script to safe-write files.
    ```bash
    # In n8n 'Execute Command' node
    echo '{{JSON.stringify($json)}}' > update_payload.json
    node _scripts/inject_updates.js update_payload.json
    ```
3.  **Dependencies**: If `dependencies` array is not empty, run:
    ```bash
    pnpm install
    ```
4.  **Build**: Verify integrity.
    ```bash
    npm run build
    ```

## 3. Usage Guide (Optimized)
1. **Setup Template**:
   ```bash
   cd _BASE_STACK_V4
   # Use pnpm for 10x faster installs and disk space saving
   npm install -g pnpm
   pnpm install
   ```

2. **n8n Copy Command (Corrected)**:
   *Crucial: Use source/ to copy CONTENTS, not the folder itself.*
   ```bash
   # Create destination
   mkdir -p /proyectos/new-client
   
   # Copy contents (fast with pnpm hardlinks)
   cp -r /path/to/_BASE_STACK_V4/. /proyectos/new-client/
   ```

3. **Performance Strategy (pnpm)**:
   - **Why?**: `cp -r` with standard `node_modules` (npm) is slow (thousands of small files).
   - **Solution**: `pnpm` uses a global store. The `node_modules` in the template are symlinks/hardlinks, making the copy operation nearly instant.
   - **Docker Note**: Ensure your n8n Docker image has `pnpm` installed (`RUN npm install -g pnpm`).

## Known Constraints
- **React 19 Types**: Strict mode can be aggressive with `DragEventHandler` in Framer Motion. This is a known upstream friction point but does not affect runtime.


## 5. n8n "Execute Command" Script
Use this script in your n8n **Execute Command** node to capture the full context of a cloned project (`context.xml` is not needed if you stream this output directly).

```bash
# Variables (Map from previous node)
NOMBRE="{{ $('NodeName').item.json.nombre_demo }}"
DIR="/home/node/proyectos/$NOMBRE"

# Header
echo "<project_context>"

# Find absolute ALL relevant files
# Includes: TS, TSX, CSS, JSON, HTML, MD
# Excludes: noise like package-lock, dist, git, node_modules
find "$DIR" -type f \
    \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.json" -o -name "*.html" -o -name "*.md" \) \
    -not -path "*/node_modules/*" \
    -not -path "*/.git/*" \
    -not -path "*/dist/*" \
    -not -path "*/.gemini/*" \
    -not -name "package-lock.json" \
    -not -name "*error.log" \
    | while read file; do

    # Clean relative path (remove $DIR prefix)
    rel_path="${file#$DIR/}"

    # XML Format
    echo "  <file path=\"$rel_path\">"
    cat "$file"
    echo "  </file>"
done

# Footer
echo "</project_context>"
```
