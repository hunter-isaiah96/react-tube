import { create } from "zustand"
import { type UsersResponse } from "@/app/pocketbase-types"
type AuthState = {
  user: UsersResponse | null
  setUser: (user: UsersResponse | null) => void
}

const initialAuthState = {
  user: null,
}

export const useAuthStore = create<AuthState>((set) => ({
  ...initialAuthState,
  setUser: (user: UsersResponse | null) => set({ user }),
}))
