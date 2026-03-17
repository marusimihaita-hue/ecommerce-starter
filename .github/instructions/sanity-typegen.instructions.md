---
applyTo: "sanity/**/*.ts,app/**/*.ts,app/**/*.tsx"
description: "Use when working with Sanity typegen, generated types, and typed GROQ queries."
---

## Sanity Typegen instructions

- Run `pnpm sanity typegen generate` to regenerate types after schema changes.
- Import generated types from `sanity.types.ts` at the project root.
- Use `defineQuery` from `groq` to write typed queries compatible with typegen.
- Avoid casting query results with `as` — rely on generated types instead.
- When adding new schema fields, regenerate types before writing components consuming them.
- Keep `sanity.config.ts` schema registration in sync with files in `sanity/schemaTypes/`.
