import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Quiz } from '@custom-types/createSchedule'

type ScheduleState = {
  isModalOpen: boolean
  selectedQuiz: Quiz | null
}

type ScheduleActions = {
  openModal: (quiz: Quiz) => void
  closeModal: () => void
}

export type ScheduleStore = ScheduleState & ScheduleActions

export const useScheduleStore = create<ScheduleStore>()(
  devtools(
    (set) => ({
      // 상태
      isModalOpen: false,
      selectedQuiz: null,

      // 액션
      openModal: (quiz) =>
        set({ isModalOpen: true, selectedQuiz: quiz }, false, 'openModal'),

      closeModal: () =>
        set({ isModalOpen: false, selectedQuiz: null }, false, 'closeModal'),
    }),
    { name: 'schedule-store' }
  )
)
