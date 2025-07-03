import { useState } from 'react'
import { INITIAL_FORM_DATA, createSchedulePayload } from '@utils/scheduleUtils'
import type {
  ScheduleFormData,
  UseScheduleFormProps,
  FormValidationResult,
} from '@custom-types/createSchedule'
import { SCHEDULE_CONSTANTS } from '@constants/create-schedule/createSchedule'

export const useScheduleForm = ({
  onSubmit,
  test_id,
  courses,
  generations,
}: UseScheduleFormProps) => {
  const [formData, setFormData] = useState<ScheduleFormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA)
  }

  const updateFormField = (field: keyof ScheduleFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateScheduleForm = (
    formData: ScheduleFormData
  ): FormValidationResult => {
    const {
      course_name,
      generation_id,
      duration_time,
      start_date,
      start_time,
      end_date,
      end_time,
    } = formData

    // 필수 필드 검증
    if (
      !course_name ||
      !generation_id ||
      !duration_time ||
      !start_date ||
      !start_time ||
      !end_date ||
      !end_time
    ) {
      return {
        isValid: false,
        errorMessage: SCHEDULE_CONSTANTS.VALIDATION.MESSAGES.REQUIRED_FIELDS,
      }
    }

    // 진행 시간 검증
    const durationNum = Number(duration_time)
    if (
      durationNum < SCHEDULE_CONSTANTS.VALIDATION.CONSTRAINTS.MIN_DURATION_TIME
    ) {
      return {
        isValid: false,
        errorMessage: SCHEDULE_CONSTANTS.VALIDATION.MESSAGES.INVALID_DURATION,
      }
    }

    // 날짜/시간 검증
    const startDateTime = new Date(`${start_date}T${start_time}`)
    const endDateTime = new Date(`${end_date}T${end_time}`)

    if (startDateTime >= endDateTime) {
      return {
        isValid: false,
        errorMessage: SCHEDULE_CONSTANTS.VALIDATION.MESSAGES.INVALID_DATE_RANGE,
      }
    }

    return { isValid: true }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const validationResult = validateScheduleForm(formData)
      if (!validationResult.isValid) {
        throw new Error(validationResult.errorMessage)
      }

      // courses에서 course_name으로 course를 찾기 (유효성 검증용)
      const selectedCourse = courses.find(
        (course) => course.name === formData.course_name
      )
      if (!selectedCourse) {
        throw new Error(SCHEDULE_CONSTANTS.VALIDATION.MESSAGES.REQUIRED_FIELDS)
      }

      // generations에서 generation_id로 generation을 찾기 (유효성 검증용)
      const selectedGeneration = generations.find(
        (generation) => generation.id === Number(formData.generation_id)
      )
      if (!selectedGeneration) {
        throw new Error(SCHEDULE_CONSTANTS.VALIDATION.MESSAGES.REQUIRED_FIELDS)
      }

      const payload = createSchedulePayload(formData, test_id)
      await onSubmit(payload)

      return { success: true }
    } catch (error: any) {
      const errorMessage = error.message
      return {
        success: false,
        error:
          errorMessage ===
            SCHEDULE_CONSTANTS.VALIDATION.MESSAGES.REQUIRED_FIELDS ||
          errorMessage ===
            SCHEDULE_CONSTANTS.VALIDATION.MESSAGES.INVALID_DATE_RANGE ||
          errorMessage ===
            SCHEDULE_CONSTANTS.VALIDATION.MESSAGES.INVALID_DURATION
            ? errorMessage
            : SCHEDULE_CONSTANTS.API.ERROR_MESSAGE,
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    isSubmitting,
    updateFormField,
    resetForm,
    handleSubmit,
  }
}
