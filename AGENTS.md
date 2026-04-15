# AGENTS.md — Token Palette Studio

Rules and guardrails for AI agents and contributors working on this codebase.

## Scope

This is a front-only visual design token editor. No backend, no auth, no database, no external APIs.

## Anti-Drift Rules

1. **Do not add Supabase, auth, backend, or external API integrations.**
2. **Do not change the product concept.** This is a token configuration tool with preview and export.
3. **No opportunistic refactoring outside the scope of the current task.**
4. **No new dependencies without strong justification.** Prefer native/existing solutions.
5. **One package manager: npm.** Do not introduce yarn, pnpm, or bun as alternatives.
6. **One CSS export, one JSON export.** Do not create parallel export systems.
7. **Do not generate `tailwind.config.js` as an export.** The export is `globals.css` (Tailwind v4 `@theme`).

## TypeScript Conventions

- **`strict: true`** is enabled and must stay enabled.
- **No `any`** unless there is an exceptional, documented justification.
- **No aggressive casts** (`as unknown as X`) to silence the compiler.
- **No `@ts-ignore` or `@ts-expect-error`** without a comment explaining why.
- **No `eslint-disable`** without a comment explaining why.

## Data Conventions

- **Single source of truth:** the `TokenConfig` object validated by Zod.
- **Never trust incoming data.** Always validate with Zod before hydration (localStorage, import).
- **Semantic tokens reference primitive keys.** The Zod schema enforces this with `superRefine`.
- **Component tokens reference semantic keys** (via `z.enum(SEMANTIC_COLOR_KEYS)`) and **primitive scale keys** (validated in `superRefine`).
- **Do not duplicate token values** across multiple files. `defaults.ts` is the single default config. `presets.ts` builds on it.

## Code Quality

- No `console.log` in production code (use `console.error` only for actual errors).
- No dead code left "just in case."
- No TODO comments without an associated issue or plan.
- Keep components focused: no heavy business logic in visual components.
- Pure functions for all transformations (export, contrast, color conversion).

## Validation Before Delivery

Before considering any change complete, all four commands must pass:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Testing

- Tests live in `src/test/`.
- Focus on business logic: schema validation, storage, export, color utilities.
- Do not test UI components unless there's a specific interaction bug.

## File Structure

Do not reorganize the directory structure without explicit approval. The current structure is:

- `src/types/` — Types and Zod schemas
- `src/data/` — Static data (defaults, presets)
- `src/lib/` — Pure business logic (export, storage, contrast, resolver)
- `src/hooks/` — React state management
- `src/features/` — Feature-specific UI (editors, export panel, audit)
- `src/components/` — Shared UI components (layout, preview, editors, ui primitives)

## Security

- No secrets in client code.
- All `VITE_*` variables are public.
- Do not prepare code that assumes a hidden backend.
