export interface Quiz {
  test_id: number
  test_title: string
  thumbnail_img_url: string
  subject_title: string
  question_count: number
  total_score?: number
  submission_status: 'submitted' | 'not_submitted'
  score?: number
  correct_count?: number
}

export type SchedulePayload = {
  test_id: number // API에는 test_id 전송
  generation_id: number
  duration_time: number
  open_at: string
  close_at: string
}

export type ScheduleFormData = {
  course_name: string // 폼에서는 과정 선택 유지
  generation_id: string
  duration_time: string
  start_date: string
  start_time: string
  end_date: string
  end_time: string
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
  selectedQuiz: Quiz | null
  courses: ClassOption[] // 과정 선택을 위해 유지
  generations: ClassOption[]
}

export type FormValidationResult = {
  isValid: boolean
  errorMessage?: string
}

export type UseScheduleFormProps = {
  onSubmit: (payload: SchedulePayload) => Promise<void>
  selectedQuiz: Quiz | null
  courses: ClassOption[] // 과정 선택을 위해 유지
  generations: ClassOption[]
}

export type UseScheduleFormReturn = {
  formData: ScheduleFormData
  isSubmitting: boolean
  updateFormField: (field: keyof ScheduleFormData, value: string) => void
  handleSubmit: () => Promise<{ success: boolean; error?: string }>
  resetForm: () => void
}
