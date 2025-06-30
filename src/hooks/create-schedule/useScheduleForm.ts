// @hooks/create-schedule/useScheduleForm.ts
import { useState, useCallback } from 'react'
import {
  INITIAL_FORM_DATA,
  validateScheduleForm,
  createSchedulePayload,
} from '@utils/scheduleUtils'
import type {
  ScheduleFormData,
  SchedulePayload,
} from '@custom-types/createSchedule'
import { VALIDATION_MESSAGES } from '@constants/create-schedule/createSchedule'

export const useScheduleForm = () => {
  const [formData, setFormData] = useState<ScheduleFormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA)
  }, [])

  const updateFormField = useCallback(
    (field: keyof ScheduleFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  const handleSubmit = useCallback(
    async (onSubmit: (payload: SchedulePayload) => Promise<void>) => {
      setIsSubmitting(true)
      try {
        const validationResult = validateScheduleForm(formData)
        if (!validationResult.isValid) {
          throw new Error(validationResult.errorMessage)
        }

        const payload = createSchedulePayload(formData)
        await onSubmit(payload)

        return { success: true }
      } catch (error: any) {
        // API 에러 발생 시, VALIDATION_MESSAGES.API_ERROR를 사용하도록 통일
        // 유효성 검사 에러 (throw new Error(validationResult.errorMessage))는 그대로 전달
        const errorMessage = error.message

        // errorMessage가 validateScheduleForm에서 온 것이면 그대로 사용하고,
        // 그렇지 않다면 일반적인 API 에러 메시지를 사용
        // 또는, 단순히 API 오류일 때만 VALIDATION_MESSAGES.API_ERROR를 반환
        return {
          success: false,
          error:
            errorMessage.includes('모든 항목을') ||
            errorMessage.includes('일시가 늦을 수') ||
            errorMessage.includes('1분 이상')
              ? errorMessage // 유효성 검사 에러 메시지는 그대로
              : VALIDATION_MESSAGES.API_ERROR, // 그 외의 에러는 표준 API 에러 메시지
        }
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData]
  )

  return {
    formData,
    isSubmitting,
    updateFormField,
    resetForm,
    handleSubmit,
  }
}
