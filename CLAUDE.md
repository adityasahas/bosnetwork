# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start development server
bun build        # Production build
bun start        # Start production server
bun lint         # Run ESLint
```

## Environment

Copy `.env.example` to `.env` and fill in:
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — Server-side key (never exposed to client)

## Architecture

**bos.network** is a Boston/Cambridge startup founders directory. Next.js App Router with a clear server/client split:

- **`app/page.tsx`** — Async server component. Fetches all founders from Supabase with 60s ISR revalidation. Passes data down to the client tree.
- **`app/components/Directory.tsx`** — The single large client component (`"use client"`) that owns all UI state: search query, active college/club filters, and the selected founder for the detail overlay. Uses `useMemo` for filtered results and dynamic filter lists.
- **`lib/supabase.ts`** — Singleton Supabase client (server-only). Uses the service role key, so it must never be imported from client components.
- **`lib/types.ts`** — `Founder` interface; the only shared data type.

## Key Patterns

**Server → Client data flow**: All Supabase fetching happens in `page.tsx`; `Directory.tsx` receives founders as a prop and never fetches independently.

**StartupLogo.tsx** samples image pixels at render time to detect tone (light/dark/neutral) using NTSC luminance weights, then adjusts the logo plate background color accordingly.

**Bio link rendering** in `FounderDetail.tsx`: markdown-style `[text](url)` links in the `bio` field are parsed with a regex and converted to JSX anchor elements.

## Tech Stack

- Next.js 16 / React 19 (App Router, RSC)
- Tailwind CSS v4 — config lives entirely in `app/globals.css` via `@theme inline`; no `tailwind.config.*` file
- Supabase (PostgreSQL) for the founders dataset
- Phosphor Icons (`@phosphor-icons/react`)
- Bun as package manager
