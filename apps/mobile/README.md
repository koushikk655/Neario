# Nearfold — Mobile

The Expo + React Native app for Nearfold, a hyperlocal marketplace for home-based sellers and local commerce in Tier 2 Indian cities.

This is `apps/mobile` inside the Nearfold pnpm workspace. The backend lives in `apps/api`.

## Stack

- **Expo SDK 52** (New Architecture default)
- **React Native 0.76** · **Reanimated 3** · **Moti**
- **expo-router** for file-based routing
- **TanStack Query** for server state · **Zustand** for client state
- **expo-image** · **expo-haptics** · **@gorhom/bottom-sheet**

## Run it

```bash
# from repo root
pnpm install

# pick a platform
pnpm --filter mobile ios       # iOS simulator
pnpm --filter mobile android   # Android emulator / device
pnpm --filter mobile start     # dev server, pick platform via Expo CLI menu
```

> **Fonts required.** Drop the Fraunces + Inter + JetBrains Mono `.ttf` files into `assets/fonts/` before the first run. See [`assets/fonts/README.md`](./assets/fonts/README.md) for one-command install.

## Design system pattern

The design system is the source of truth — see the **"Nearfold — Design System v1.2"** front-door in the project Library for all 12 phase artifacts.

In code, this surfaces as:

- **`src/theme/`** — token modules (colors light/dark, spacing, radii, typography, shadows). The `Theme` type is the contract every component reads against.
- **`src/motion/`** — durations, easings, springs. Moti and Reanimated both consume these directly.
- **`src/theme/ThemeProvider.tsx`** — resolves Light vs Dark from (a) the user's Zustand-stored mode preference and (b) `Appearance` (system color scheme). Default mode is `'system'`, fallback `'light'`.
- **`useTheme()`** — the primary hook. Returns the resolved `Theme` object. Use `useThemeContext()` if you also need `setMode` / `cycleMode`.

### Component contract

> **No hardcoded colors, spacing, or radii in components.** Read every visual value from `useTheme()`. This is what lets us ship light + dark from a single component, and what lets the design team adjust the palette without code changes.

When you add a new component:

1. Start with `const theme = useTheme();`
2. Pull colors from `theme.colors.*`, spacing from `theme.spacing.*`, type from `theme.type.*`, radii from `theme.radii.*`, motion from `src/motion`.
3. Use the `variant + size` prop pattern — match the existing 5 primitives.
4. Add an entry to `src/components/index.ts`.

## Week 1 scope (this branch — `feat/mobile-mvp`)

Foundations + 5 primitives. See the demo screen at `app/index.tsx` for the running gallery.

- [x] pnpm workspace integration (`apps/mobile`)
- [x] Expo scaffold, babel + metro configs (pnpm-aware)
- [x] Font loader (Fraunces / Inter / JetBrains Mono)
- [x] Theme system (light + dark, system match, Light fallback)
- [x] Motion tokens (durations, easings, springs)
- [x] Button · TextInput · Card · Chip · Avatar
- [x] Demo screen with theme toggle

## Project structure

```
apps/mobile/
├─ app/                     # expo-router routes
│  ├─ _layout.tsx           # root layout, providers, splash gate
│  └─ index.tsx             # week-1 demo screen
├─ src/
│  ├─ components/           # 5 primitives + barrel
│  ├─ theme/                # tokens + provider + useTheme
│  ├─ motion/               # duration / easing / spring tokens
│  ├─ store/                # Zustand stores (themeStore so far)
│  └─ hooks/                # useFonts and future shared hooks
├─ assets/
│  └─ fonts/                # ship Fraunces + Inter + JetBrains Mono here
├─ app.json                 # Expo config
├─ babel.config.js          # reanimated plugin
├─ metro.config.js          # pnpm-workspace aware
└─ tsconfig.json            # extends expo/tsconfig.base
```
