# Token Palette Studio

A visual design token configuration tool. Define a design system without writing code, preview changes instantly, and export tokens as CSS or JSON for use in Tailwind v4 projects.

## Stack

- **React 18** + **TypeScript** (strict mode)
- **Tailwind CSS v3** (app shell)
- **Zod** for schema validation
- **Vite 5** for build
- **Vitest** for testing
- **ESLint** for linting
- **localStorage** for persistence (no backend)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run typecheck` | TypeScript strict check |
| `npm run lint` | ESLint |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

## Repository Structure

```
src/
├── app/                    # ErrorBoundary
├── pages/                  # Index, NotFound
├── components/
│   ├── ui/                 # Shadcn/Radix primitives
│   ├── editors/            # Shared editor controls (ColorInput, FieldRow)
│   ├── layout/             # AppShell, AppSidebar, SectionHeader, SectionPanel
│   └── preview/            # Live preview panel
├── features/
│   ├── token-studio/       # Editors per category (Colors, Typography, etc.)
│   ├── export/             # CSS + JSON export UI
│   └── audit/              # Contrast & integrity checks
├── data/
│   ├── defaults.ts         # Default token configuration
│   └── presets.ts          # 3 presets: Minimal, SaaS, Dark
├── types/
│   └── tokens.ts           # TypeScript types + Zod schema (source of truth)
├── hooks/
│   └── useTokenStore.tsx   # Central state (React Context + localStorage)
├── lib/
│   ├── export-css.ts       # JSON → globals.css (Tailwind v4 @theme)
│   ├── export-json.ts      # JSON serialization
│   ├── contrast.ts         # WCAG contrast calculation
│   ├── storage.ts          # localStorage with Zod validation
│   └── token-resolver.ts   # Resolve semantic → primitive colors
├── utils/
│   └── color.ts            # Hex/RGB helpers, luminance, contrast ratio
└── test/
    ├── setup.ts            # Test setup (jsdom)
    ├── validation.test.ts  # Schema validation tests
    ├── storage.test.ts     # Persistence tests
    ├── export.test.ts      # CSS/JSON export tests
    └── color.test.ts       # Color utility tests
```

## Source of Truth

The single source of truth is a `TokenConfig` JSON object, validated by Zod.

**Hierarchy:**
1. **Primitives** — raw values (colors, spacing, radii, shadows, motion, typography, breakpoints)
2. **Semantic** — light/dark mappings referencing primitive keys
3. **Components** — UI-specific tokens referencing semantic keys + primitive scales

The schema enforces cross-field integrity: semantic tokens must reference existing primitive color keys, component tokens must reference valid semantic keys and primitive scale keys.

## Import / Export

- **Export CSS** — generates a `globals.css` compatible with Tailwind v4 `@theme` directives
- **Export JSON** — the raw `TokenConfig` object (source of truth)
- **Import JSON** — paste or load a JSON file; validated with Zod before hydration

There is **one** CSS export and **one** JSON export. No parallel export systems.

## Persistence

- Auto-saved to `localStorage` with debounce (500ms)
- Validated with Zod on load; falls back to defaults if corrupted
- Reset button restores default configuration

## V1 Limitations

- Front-only (no backend, no auth, no database)
- Light mode editing only (dark mode tokens are configurable but preview is light-only)
- No collaboration features
- No marketplace or plugin system
- No automatic injection into other projects

## Validation Before Merge

Before any merge or deploy, ensure:

```bash
npm run typecheck && npm run lint && npm test && npm run build
```

All four must pass.
