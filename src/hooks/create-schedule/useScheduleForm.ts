import { useState, useCallback } from 'react'
import {
  INITIAL_FORM_DATA,
  validateScheduleForm,
  createSchedulePayload,
} from '@utils/scheduleUtils'
import type {
  ScheduleFormData,
  UseScheduleFormProps,
} from '@custom-types/createSchedule'
import { SCHEDULE_CONSTANTS } from '@constants/create-schedule/createSchedule'

export const useScheduleForm = ({
  onSubmit,
  selectedQuiz,
  courses,
  generations,
}: UseScheduleFormProps) => {
  const [formData, setFormData] = useState<ScheduleFormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA)
  }, [])

  const updateFormField = useCallback(
    (field: keyof ScheduleFormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    },
    []
  )

  const handleSubmit = useCallback(async () => {
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

      const payload = createSchedulePayload(formData, selectedQuiz)
      await onSubmit(payload)

      return { success: true }
    } catch (error: any) {
      const errorMessage = error.message
      const { VALIDATION, API } = SCHEDULE_CONSTANTS

      return {
        success: false,
        error:
          errorMessage === VALIDATION.MESSAGES.REQUIRED_FIELDS ||
          errorMessage === VALIDATION.MESSAGES.INVALID_DATE_RANGE ||
          errorMessage === VALIDATION.MESSAGES.INVALID_DURATION
            ? errorMessage
            : API.ERROR_MESSAGE,
      }
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, selectedQuiz, onSubmit, courses, generations])

  return {
    formData,
    isSubmitting,
    updateFormField,
    resetForm,
    handleSubmit,
  }
}
