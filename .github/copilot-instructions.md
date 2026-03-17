# Project Copilot Instructions (VS Code)

Use these rules for all coding tasks in this repository.

## Stack and scope

- Use Next.js App Router with TypeScript.
- Use shadcn/ui components from components/ui.
- Use Sanity for CMS content and schema-driven data.
- Prefer server components by default in app routes.

## Code style

- Keep changes small and local to the request.
- Preserve existing naming and folder conventions.
- Avoid broad refactors unless explicitly requested.
- Write clear, strongly typed TypeScript.

## UI and UX

- Reuse existing UI primitives before creating new ones.
- Keep forms accessible with labels, errors, and keyboard support.
- Use loading and empty states for async content.

## Data and Sanity

- Check schema types before writing queries or mutations.
- Prefer typed query helpers and predictable projections.
- Do not hardcode secrets; use environment variables.

## Safety checks

- After edits, run the lightest relevant validation (typecheck or lint when useful).
- If a command fails, explain the concrete error and propose the next fix.
