# youssefkandeel.com

A pixel-perfect dev portfolio, blog, and shadcn registry, built with Next.js 16 and Tailwind CSS v4.

**Live site:** [youssefkandeel.com](https://youssefkandeel.com)

## Features

- **Portfolio** — a single-page profile with work experience, projects, certifications, tech stack, and an interactive timeline.
- **Blog** — MDX posts with syntax highlighting, a table-of-contents minimap, and per-post OG images.
- **Component registry** — 37 components, 13 blocks, and 3 hooks distributed through the shadcn CLI, each with live docs, source view, and copy-paste install commands.
- **Blocks browser** — full-page block previews with responsive resizing and per-category listings.
- **Extras** — bookmarks, sponsors, testimonials, insights, and a playable Daikanoid game.

## Tech stack

| Area       | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 16 (App Router), React 19             |
| Language   | TypeScript (strict)                           |
| Styling    | Tailwind CSS v4, shadcn/ui, Base UI, Radix UI |
| Content    | MDX via `next-mdx-remote`, Shiki              |
| Motion     | Motion (Framer Motion)                        |
| Testing    | Vitest                                        |
| Tooling    | pnpm, Bun (scripts), ESLint, Prettier, Husky  |
| Deployment | Vercel                                        |

## Getting started

Requires Node.js 22+, pnpm 9+, and [Bun](https://bun.sh) for the build scripts.

```bash
git clone https://github.com/youssefkandeel/youssefkandeel.com.git
cd youssefkandeel.com
pnpm install
cp .env.example .env.local
pnpm dev
```

Every environment variable is optional for local development — the site degrades gracefully without analytics, ads, or API tokens. See [`.env.example`](.env.example) for what each one enables, and [DEVELOPMENT.md](DEVELOPMENT.md) for the full setup guide including the local HTTPS origin.

## Scripts

```bash
pnpm dev                # Start the dev server
pnpm build              # Build the registry, then the production bundle
pnpm start              # Serve the production build
pnpm test               # Vitest in watch mode
pnpm test:run           # Vitest, single run
pnpm lint               # ESLint
pnpm check-types        # tsc --noEmit
pnpm format:write       # Prettier
pnpm registry:build     # Regenerate the shadcn registry
pnpm registry:validate  # Validate the generated registry.json
```

## Using the registry

Components are published as a namespaced shadcn registry, so they install straight from the CLI:

```bash
pnpm dlx shadcn@latest add @youssefkandeel/spotlight-logo
```

Browse the catalogue at [youssefkandeel.com/components](https://youssefkandeel.com/components).

## Project structure

```
src/
├── app/         App Router pages, layouts, and API routes
├── components/  Shared UI components
├── config/      Site, registry, and JSON-LD configuration
├── features/    Feature modules: doc, blog, portfolio, sponsor, bookmark
├── registry/    Registry source: components, hooks, blocks, examples, lib
├── scripts/     Build scripts (registry, icons, capture) run with Bun
└── lib/         Utilities, hooks, and the brand pixel grid
```

Content lives in `src/features/doc/content/` as MDX. A file's folder determines its category — `blog/` for posts, `components/` for component docs.

## Contributing

Issues and pull requests are welcome. Please run `pnpm lint`, `pnpm check-types`, and `pnpm test:run` before opening a PR. Project conventions are documented in [AGENTS.md](AGENTS.md).
