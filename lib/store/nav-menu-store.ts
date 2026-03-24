import { createStore } from "zustand/vanilla";

export interface NavMenuState {
  isOpen: boolean;
}

export interface NavMenuActions {
  openNavMenu: () => void;
  closeNavMenu: () => void;
  toggleNavMenu: () => void;
}

export type NavMenuStore = NavMenuState & NavMenuActions;

export const defaultNavMenuState: NavMenuState = {
  isOpen: false,
};

export const createNavMenuStore = (init: NavMenuState = defaultNavMenuState) =>
  createStore<NavMenuStore>((set) => ({
    ...init,
    openNavMenu: () => set({ isOpen: true }),
    closeNavMenu: () => set({ isOpen: false }),
    toggleNavMenu: () => set((s) => ({ isOpen: !s.isOpen })),
  }));
