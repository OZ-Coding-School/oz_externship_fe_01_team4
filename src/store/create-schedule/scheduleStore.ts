import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { quizAPI } from 'src/api/scheduleApi'
import type { SchedulePayload, Quiz } from '@custom-types/createSchedule'

type ScheduleState = {
  isLoading: boolean
  error: string | null
  isModalOpen: boolean
  selectedQuiz: Quiz | null
}

type ScheduleActions = {
  openModal: (quiz: Quiz) => void
  closeModal: () => void
  deploySchedule: (payload: SchedulePayload) => Promise<void>
}

export type ScheduleStore = ScheduleState & ScheduleActions

export const useScheduleStore = create<ScheduleStore>()(
  devtools(
    (set) => ({
      isLoading: false,
      error: null,
      isModalOpen: false,
      selectedQuiz: null,

      openModal: (quiz) =>
        set({ isModalOpen: true, selectedQuiz: quiz }, false, 'openModal'),

      closeModal: () =>
        set({ isModalOpen: false, selectedQuiz: null }, false, 'closeModal'),

      deploySchedule: async (payload) => {
        set({ isLoading: true, error: null }, false, 'deploy/start')
        try {
          await quizAPI.setDeploySchedule(payload)
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : '배포에 실패했습니다.'
          set({ error: errorMessage }, false, 'deploy/error')
          throw error
        } finally {
          set({ isLoading: false }, false, 'deploy/finish')
        }
      },
    }),
    { name: 'schedule-store' }
  )
)
