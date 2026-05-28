// Theme store — Zustand. Holds the user's explicit theme preference
// (system / light / dark). The actual resolution to a light or dark
// `Theme` object happens in `ThemeProvider` by combining this preference
// with the OS color scheme.
//
// Why split preference from resolved theme: the resolution depends on
// `Appearance` which can change at runtime when the user flips their
// system setting. We listen to that in the provider, not the store.

import { create } from 'zustand';

export type ThemeMode = 'system' | 'light' | 'dark';

interface ThemeStore {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  cycleMode: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  mode: 'system',
  setMode: (mode) => set({ mode }),
  cycleMode: () =>
    set((state) => {
      const order: ThemeMode[] = ['system', 'light', 'dark'];
      const next = order[(order.indexOf(state.mode) + 1) % order.length];
      return { mode: next ?? 'system' };
    }),
}));
