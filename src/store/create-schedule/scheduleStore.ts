import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type SelectedQuizInfo = {
  test_id: number
  test_title: string
  subject_title: string
}

type ScheduleState = {
  isModalOpen: boolean
  selectedQuiz: SelectedQuizInfo | null
}

type ScheduleActions = {
  openScheduleModal: (quizInfo: SelectedQuizInfo) => void
  closeScheduleModal: () => void
}

export type ScheduleStore = ScheduleState & ScheduleActions

export const useScheduleStore = create<ScheduleStore>()(
  devtools(
    (set) => ({
      // 상태
      isModalOpen: false,
      selectedQuiz: null,

      // 액션
      openScheduleModal: (quizInfo) =>
        set({ isModalOpen: true, selectedQuiz: quizInfo }, false, 'openModal'),

      closeScheduleModal: () =>
        set({ isModalOpen: false, selectedQuiz: null }, false, 'closeModal'),
    }),
    { name: 'schedule-store' }
  )
)
