---
source: Netlify Official Docs
library: Netlify
package: netlify-build
topic: SECRETS_SCAN_OMIT_KEYS syntax
fetched: 2026-02-13T10:45:00Z
official_docs: https://docs.netlify.com/build/environment-variables/secrets-controller/#configure-secret-scanning
---

# Netlify Secret Scanning Configuration

To prevent build failures caused by false positives in Netlify's secret scanning, you can configure `SECRETS_SCAN_OMIT_KEYS` in your `netlify.toml` file.

## Exact Syntax

Add the following to your `netlify.toml`:

```toml
[build.environment]
  SECRETS_SCAN_OMIT_KEYS = "MY_FALSE_POSITIVE_KEY,ANOTHER_KEY"
```

### Key Details:
- **Variable Name:** `SECRETS_SCAN_OMIT_KEYS`
- **Value Format:** A comma-separated list of environment variable **keys** (names) that should be excluded from the scanning process.
- **Location:** Typically placed under `[build.environment]` for global application, or under specific contexts like `[context.production.environment]`.

## Related Configuration

If you need to omit specific files or directories from being scanned, use `SECRETS_SCAN_OMIT_PATHS`:

```toml
[build.environment]
  SECRETS_SCAN_OMIT_PATHS = "path/to/ignore,tests/**,*.md"
```

- **Value Format:** Comma-separated list of file paths relative to the repository root. Supports substrings and glob patterns.

## Why use this?
Netlify automatically scans for environment variables marked as "secrets" in your build output. If a value is found (e.g., injected into a JS bundle), the build fails. Use these variables to safelist keys or paths that are known to be safe or are false positives.
