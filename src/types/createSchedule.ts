// types/createSchedule.ts

// 쪽지시험 관련 타입
export interface Quiz {
  id: number
  title: string
  subject_name: string
  question_count: number
  submission_count: number
  created_at: string
  updated_at: string
}

export type SchedulePayload = {
  testId: number
  classId: number
  durationMinutes: number
  startAt: string
  endAt: string
}

export type ScheduleFormData = {
  testId: string
  classId: string
  duration: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

export type QuizOption = {
  id: number
  title: string
}

export type ClassOption = {
  id: number
  name: string
}

export type DropdownOption = {
  label: string
  value: string
}

export type ScheduleCreateModalProps = {
  isOpen: boolean
  onClose: () => void
  quizzes: QuizOption[]
  classes: ClassOption[]
  onSubmit: (payload: SchedulePayload) => Promise<void>
}

export type FormValidationResult = {
  isValid: boolean
  errorMessage?: string
}

// Submit 관련 타입들
export type SubmitState = {
  isSubmitSuccess: boolean
  submitError: string | null
}

export type SubmitActions = {
  setSubmitSuccess: (success: boolean) => void
  setSubmitError: (error: string | null) => void
  clearSubmitError: () => void
}

// useScheduleForm Hook 타입
export type UseScheduleFormProps = {
  onSubmit?: (payload: SchedulePayload) => Promise<void>
  setSubmitSuccess: (success: boolean) => void
  setSubmitError: (error: string) => void
}

export type UseScheduleFormReturn = {
  formData: ScheduleFormData
  isSubmitting: boolean
  updateFormField: (field: keyof ScheduleFormData, value: string) => void
  handleSubmit: () => Promise<void>
  resetForm: () => void
}
