import { create } from 'zustand'

interface AppState {
  shouldRefetch: boolean
  setShouldRefetch: (shouldRefetch: boolean) => void
}

export const useStore = create<AppState>((set) => ({
  shouldRefetch: false,
  setShouldRefetch: (shouldRefetch) => set({ shouldRefetch }),
}))
