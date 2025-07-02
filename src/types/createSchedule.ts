// 배포 일정 생성에 필요한 정보
export type SchedulePayload = {
  test_id: number
  generation_id: number
  duration_time: number
  open_at: string
  close_at: string
}

// 폼 데이터
export type ScheduleFormData = {
  course_name: string
  generation_id: string
  duration_time: string
  start_date: string
  start_time: string
  end_date: string
  end_time: string
}

// 드롭다운용 옵션
export type ClassOption = {
  id: number
  name: string
}

export type DropdownOption = {
  label: string
  value: string
}

// 모달 Props
export type ScheduleCreateModalProps = {
  isOpen: boolean
  onClose: () => void
  test_id: number
  test_title: string
  subject_title: string
  courses: ClassOption[]
  generations: ClassOption[]
  onSubmit: (payload: SchedulePayload) => Promise<void>
}

// 유효성 검증 결과
export type FormValidationResult = {
  isValid: boolean
  errorMessage?: string
}

// 폼 훅 Props
export type UseScheduleFormProps = {
  onSubmit: (payload: SchedulePayload) => Promise<void>
  test_id: number
  courses: ClassOption[]
  generations: ClassOption[]
}

export type UseScheduleFormReturn = {
  formData: ScheduleFormData
  isSubmitting: boolean
  updateFormField: (field: keyof ScheduleFormData, value: string) => void
  handleSubmit: () => Promise<{ success: boolean; error?: string }>
  resetForm: () => void
}
