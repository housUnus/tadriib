import { create } from "zustand";
import { UserInput } from "@/lib/schemas/users";

interface UserState {
  user: UserInput | null;
  isLoading: boolean;

  setUser: (user: UserInput) => void;
  updateUser: (partial: Partial<UserInput>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,

  setUser: (user) => set({ user }),
  updateUser: (partial) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...partial } : null,
    })),
  clearUser: () => set({ user: null }),
}));
