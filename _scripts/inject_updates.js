import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * USAGE: node _scripts/inject_updates.js <path_to_json_payload>
 * 
 * Payload Format:
 * {
 *   "thinking": "...",
 *   "files": [
 *     { "path": "src/App.tsx", "content": "..." },
 *     { "path": "src/components/New.tsx", "content": "..." }
 *   ]
 * }
 */

const payloadPath = process.argv[2];

if (!payloadPath) {
    console.error("❌ Error: No payload file argument provided.");
    console.error("Usage: node _scripts/inject_updates.js <path_to_json_payload>");
    process.exit(1);
}

try {
    // 1. Read and Parse JSON
    const rawData = fs.readFileSync(payloadPath, 'utf8');
    const payload = JSON.parse(rawData);

    if (!payload.files || !Array.isArray(payload.files)) {
        console.error("❌ Error: Invalid JSON format. Expected 'files' array.");
        process.exit(1);
    }

    console.log(`🚀 Starting Injection: ${payload.files.length} files to write.`);

    // 2. Write Files
    payload.files.forEach(file => {
        // Ensure path is relative to project root (remove leading slash if present)
        const cleanPath = file.path.replace(/^(\.\/|\/)/, '');
        // Go up one level from _scripts to project root
        const absolutePath = path.resolve(__dirname, '..', cleanPath);

        // Ensure directory exists
        const dir = path.dirname(absolutePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`   TbCreated directory: ${dir}`);
        }

        // Write content
        fs.writeFileSync(absolutePath, file.content, 'utf8');
        console.log(`   ✅ Wrote: ${cleanPath}`);
    });

    console.log("✨ Injection Complete.");

    // Optional: Clean up payload file
    // fs.unlinkSync(payloadPath);

} catch (error) {
    console.error("🔥 Critical Injection Error:", error.message);
    process.exit(1);
}
