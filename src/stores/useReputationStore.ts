'use client'

import { create } from 'zustand'
import type { ScoreLog, ScoreAction, Badge } from '@/types'
import { badges } from '@/data/mock-badges'

interface ReputationState {
  scoreLogs: ScoreLog[]
  allBadges: Badge[]

  addScore: (
    userId: string,
    action: ScoreAction,
    delta: number,
    description: string,
  ) => void
  getUserBadges: (userId: string) => Badge[]
  getScoreHistory: (userId: string) => ScoreLog[]
}

export const useReputationStore = create<ReputationState>()((set, get) => ({
  scoreLogs: [],
  allBadges: [...badges],

  addScore: (userId, action, delta, description) =>
    set((state) => ({
      scoreLogs: [
        ...state.scoreLogs,
        {
          id: `score-${Date.now()}`,
          userId,
          action,
          delta,
          description,
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  getUserBadges: (userId) => {
    const { scoreLogs, allBadges } = get()
    const userLogs = scoreLogs.filter(
      (l) => l.userId === userId && l.action === 'badge_earned',
    )
    const earnedBadgeIds = userLogs.map((l) => l.description)
    return allBadges.filter((b) => earnedBadgeIds.includes(b.id))
  },

  getScoreHistory: (userId) =>
    get().scoreLogs.filter((l) => l.userId === userId),
}))
