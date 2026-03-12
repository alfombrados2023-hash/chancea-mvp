'use client'

import { create } from 'zustand'
import type {
  MissionTemplate,
  Event,
  Participation,
  MissionCategory,
} from '@/types'
import { missionTemplates } from '@/data/mock-missions'
import { mockEvents } from '@/data/mock-events'

interface MissionState {
  missions: MissionTemplate[]
  events: Event[]
  participations: Participation[]

  joinEvent: (eventId: string, userId: string) => void
  leaveEvent: (eventId: string, userId: string) => void
  checkIn: (eventId: string, userId: string) => void
  createEvent: (data: Omit<Event, 'id'>) => void
  getEventsByStatus: (
    status: Event['status'],
  ) => Event[]
  getNearbyEvents: (lat: number, lng: number, radiusKm: number) => Event[]
  getMissionOfTheDay: () => MissionTemplate
}

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export const useMissionStore = create<MissionState>()((set, get) => ({
  missions: missionTemplates,
  events: [...mockEvents],
  participations: [],

  joinEvent: (eventId, userId) =>
    set((state) => {
      const event = state.events.find((e) => e.id === eventId)
      if (!event || event.participantIds.includes(userId)) return state
      if (event.currentParticipants >= event.capacity) return state

      const participation: Participation = {
        id: `part-${Date.now()}`,
        userId,
        eventId,
        status: 'confirmed',
        depositPaid: true,
        checkedInAt: null,
        joinedAt: new Date().toISOString(),
      }

      return {
        events: state.events.map((e) =>
          e.id === eventId
            ? {
                ...e,
                participantIds: [...e.participantIds, userId],
                currentParticipants: e.currentParticipants + 1,
              }
            : e,
        ),
        participations: [...state.participations, participation],
      }
    }),

  leaveEvent: (eventId, userId) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === eventId
          ? {
              ...e,
              participantIds: e.participantIds.filter((id) => id !== userId),
              currentParticipants: Math.max(0, e.currentParticipants - 1),
            }
          : e,
      ),
      participations: state.participations.map((p) =>
        p.eventId === eventId && p.userId === userId
          ? { ...p, status: 'cancelled' as const }
          : p,
      ),
    })),

  checkIn: (eventId, userId) =>
    set((state) => ({
      participations: state.participations.map((p) =>
        p.eventId === eventId && p.userId === userId
          ? {
              ...p,
              status: 'checked_in' as const,
              checkedInAt: new Date().toISOString(),
            }
          : p,
      ),
    })),

  createEvent: (data) =>
    set((state) => ({
      events: [
        ...state.events,
        { ...data, id: `event-${Date.now()}` },
      ],
    })),

  getEventsByStatus: (status) =>
    get().events.filter((e) => e.status === status),

  getNearbyEvents: (lat, lng, radiusKm) =>
    get().events.filter(
      (e) =>
        haversineDistance(lat, lng, e.location.lat, e.location.lng) <= radiusKm,
    ),

  getMissionOfTheDay: () => {
    const { missions } = get()
    const today = new Date()
    const dayIndex =
      (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) %
      missions.length
    return missions[dayIndex]
  },
}))
