---
applyTo: "app/**/*.tsx,components/**/*.tsx"
description: "Use when working on Next.js pages, layouts, and reusable UI components in this project."
---

## Frontend instructions

- Prefer server components in app routes unless client state is required.
- Add "use client" only when needed for hooks, event handlers, or browser APIs.
- Keep component props typed and minimal.
- Prefer composition over large monolithic components.
- For shadcn/ui, import from local components/ui files.
- Keep Tailwind class usage consistent with existing patterns.
