'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type RoeWorld = 'entrance' | 'music' | 'newsstand' | 'tour' | 'archive'

type RoeState = {
  world: RoeWorld
  audioEnabled: boolean
  entered: boolean
  setWorld: (world: RoeWorld) => void
  setAudioEnabled: (enabled: boolean) => void
  enter: () => void
}

export const useRoeStore = create<RoeState>()(
  persist(
    (set) => ({
      world: 'entrance',
      audioEnabled: false,
      entered: false,
      setWorld: (world) => set({ world }),
      setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
      enter: () => set({ entered: true }),
    }),
    { name: 'roe-world-state' },
  ),
)
