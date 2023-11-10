import { create } from "zustand";

const useBearStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  isAdmin: false,
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  isSuspended: false,
  setIsSuspended: (isSuspended) => set({ isSuspended }),
}));

export default useBearStore;
