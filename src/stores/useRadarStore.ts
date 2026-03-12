'use client'

import { create } from 'zustand'
import type { MissionCategory, User, Event } from '@/types'

interface RadarFilters {
  categories: MissionCategory[]
  radius: number
  showPeople: boolean
  showEvents: boolean
}

interface RadarState {
  center: { lat: number; lng: number }
  zoom: number
  filters: RadarFilters
  selectedItem: User | Event | null

  setCenter: (center: { lat: number; lng: number }) => void
  setZoom: (zoom: number) => void
  setFilters: (filters: Partial<RadarFilters>) => void
  selectItem: (item: User | Event) => void
  clearSelection: () => void
}

export const useRadarStore = create<RadarState>()((set) => ({
  center: { lat: 40.4168, lng: -3.7038 },
  zoom: 13,
  filters: {
    categories: [],
    radius: 5,
    showPeople: true,
    showEvents: true,
  },
  selectedItem: null,

  setCenter: (center) => set({ center }),

  setZoom: (zoom) => set({ zoom }),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  selectItem: (item) => set({ selectedItem: item }),

  clearSelection: () => set({ selectedItem: null }),
}))
