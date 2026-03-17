---
applyTo: "sanity/**/*.ts,sanity.config.ts,sanity.cli.ts"
description: "Use when editing Sanity schema, structure, client setup, and content queries."
---

## Sanity instructions

- Treat local schema files as source of truth.
- Keep schema definitions explicit and predictable.
- Validate references and required fields in schema.
- When writing queries, project only needed fields.
- Use helper clients in sanity/lib and avoid duplicate client setup.
- Keep structure.ts aligned with active schema types.
