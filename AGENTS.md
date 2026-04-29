# Agent Instructions

This is a minimal Nuxt 4 starter intended for use with [v0](https://v0.app).

## Project conventions

- **Framework:** Nuxt 4 with Vue 3 (`<script setup>`, Composition API).
- **Package manager:** pnpm.
- **Routing:** File-based routing under `app/pages/`. The root `app/app.vue` renders `<NuxtPage />`.
- **Components:** Place reusable components in `app/components/` — they are auto-imported.
- **Layouts:** Place layouts in `app/layouts/` — they are auto-imported.
- **Styling:** Plain CSS via `<style>` blocks in SFCs. Scoped styles by default.

## Rules

- **Do NOT install Tailwind CSS** unless the user explicitly asks to add Tailwind. This starter is intentionally style-framework-free. If the user wants styling, use plain CSS in `<style>` blocks until they say otherwise.
- Do not introduce new dependencies unless the task requires it.
- Prefer Nuxt's built-in features (auto-imports, `useFetch`, `useState`, `<NuxtLink>`, etc.) over manual implementations.

## Directory structure

```
app/
  app.vue          # Root component — renders <NuxtPage />
  pages/           # File-based routes (index.vue → /)
  components/      # Auto-imported components
  layouts/         # Auto-imported layouts
public/            # Static assets served at the root
nuxt.config.ts     # Nuxt configuration
```
