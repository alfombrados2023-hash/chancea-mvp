'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'
import { mockUsers } from '@/data/mock-users'

interface AuthState {
  currentUser: User | null
  isAuthenticated: boolean
  isOnboarded: boolean

  login: () => void
  logout: () => void
  completeOnboarding: (data: Partial<User>) => void
  updateProfile: (data: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      isOnboarded: false,

      login: () => {
        const self = mockUsers.find((u) => u.id === 'user-self') ?? mockUsers[0]
        set({ currentUser: self, isAuthenticated: true })
      },

      logout: () =>
        set({ currentUser: null, isAuthenticated: false, isOnboarded: false }),

      completeOnboarding: (data) =>
        set((state) => ({
          isOnboarded: true,
          currentUser: state.currentUser
            ? { ...state.currentUser, ...data }
            : null,
        })),

      updateProfile: (data) =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, ...data }
            : null,
        })),
    }),
    { name: 'chancea-auth' },
  ),
)
