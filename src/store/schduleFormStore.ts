import { create } from 'zustand'

type ScheduleFormState = {
  quizId: string
  classId: string
  duration: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  setField: <K extends keyof ScheduleFormState>(
    field: K,
    value: ScheduleFormState[K]
  ) => void
  reset: () => void
}

export const useScheduleFormStore = create<ScheduleFormState>((set) => ({
  quizId: '',
  classId: '',
  duration: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',

  setField: (field, value) => set({ [field]: value }),
  reset: () =>
    set({
      quizId: '',
      classId: '',
      duration: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    }),
}))
