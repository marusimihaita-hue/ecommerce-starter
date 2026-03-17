---
applyTo: "app/**/*.tsx,app/**/*.ts,middleware.ts"
description: "Use when working with Clerk authentication, middleware, and protected routes."
---

## Clerk instructions

- Use Clerk middleware to protect routes via `clerkMiddleware()` in middleware.ts.
- Use `auth()` from `@clerk/nextjs/server` in server components and route handlers.
- Use `useUser()` and `useAuth()` only in client components.
- Never expose secret keys; use `CLERK_SECRET_KEY` from environment variables only on the server.
- Use `<SignInButton>`, `<SignUpButton>`, `<UserButton>` from `@clerk/nextjs` for UI.
- For role-based access, check `sessionClaims` or custom metadata from the Clerk dashboard.
