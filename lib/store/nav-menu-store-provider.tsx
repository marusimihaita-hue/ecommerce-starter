"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";
import {
  createNavMenuStore,
  defaultNavMenuState,
  type NavMenuState,
  type NavMenuStore,
} from "./nav-menu-store";

export type NavMenuStoreApi = ReturnType<typeof createNavMenuStore>;

const NavMenuStoreContext = createContext<NavMenuStoreApi | undefined>(
  undefined,
);

interface NavMenuStoreProviderProps {
  children: ReactNode;
  initialState?: NavMenuState;
}

export const NavMenuStoreProvider = ({
  children,
  initialState,
}: NavMenuStoreProviderProps) => {
  const storeRef = useRef<NavMenuStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createNavMenuStore(initialState ?? defaultNavMenuState);
  }

  return (
    <NavMenuStoreContext.Provider value={storeRef.current}>
      {children}
    </NavMenuStoreContext.Provider>
  );
};

export const useNavMenuStore = <T,>(
  selector: (store: NavMenuStore) => T,
): T => {
  const ctx = useContext(NavMenuStoreContext);
  if (!ctx) {
    throw new Error("useNavMenuStore must be used within NavMenuStoreProvider");
  }
  return useStore(ctx, selector);
};

export const useNavMenuIsOpen = () => useNavMenuStore((s) => s.isOpen);

export const useNavMenuActions = () => {
  const openNavMenu = useNavMenuStore((s) => s.openNavMenu);
  const closeNavMenu = useNavMenuStore((s) => s.closeNavMenu);
  const toggleNavMenu = useNavMenuStore((s) => s.toggleNavMenu);
  return { openNavMenu, closeNavMenu, toggleNavMenu };
};
