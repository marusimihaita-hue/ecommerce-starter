---
applyTo: "components/**/*.tsx,app/**/*.tsx"
description: "Use when working with shadcn/ui components, variants, and composition."
---

## shadcn/ui instructions

- Import components from `components/ui`, never directly from the registry.
- Use `cn()` from `lib/utils` to merge Tailwind classes conditionally.
- Prefer composition with `asChild` and `Slot` over wrapping components.
- Do not modify files inside `components/ui` directly unless customizing for this project.
- Use `variants` from `class-variance-authority` when extending component styles.
- Keep Tailwind classes consistent with the existing design tokens in globals.css.
