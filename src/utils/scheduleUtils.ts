import {
  VALIDATION_MESSAGES,
  INPUT_CONSTRAINTS,
} from '@constants/create-schedule/createSchedule'
import type {
  ScheduleFormData,
  FormValidationResult,
  SchedulePayload,
  DropdownOption,
  QuizOption,
  ClassOption,
} from '@custom-types/createSchedule'

export const INITIAL_FORM_DATA: ScheduleFormData = {
  testId: '',
  classId: '',
  duration: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
}

/**
 * 폼 데이터 유효성 검사
 */
export const validateScheduleForm = (
  formData: ScheduleFormData
): FormValidationResult => {
  const { testId, classId, duration, startDate, startTime, endDate, endTime } =
    formData

  // 필수 필드 검증
  if (
    !testId ||
    !classId ||
    !duration ||
    !startDate ||
    !startTime ||
    !endDate ||
    !endTime
  ) {
    return {
      isValid: false,
      errorMessage: VALIDATION_MESSAGES.REQUIRED_FIELDS,
    }
  }

  // 진행 시간 검증
  const durationNum = Number(duration)
  if (durationNum < INPUT_CONSTRAINTS.MIN_DURATION) {
    return {
      isValid: false,
      errorMessage: VALIDATION_MESSAGES.INVALID_DURATION,
    }
  }

  // 날짜/시간 검증
  const startDateTime = new Date(`${startDate}T${startTime}`)
  const endDateTime = new Date(`${endDate}T${endTime}`)

  if (startDateTime >= endDateTime) {
    return {
      isValid: false,
      errorMessage: VALIDATION_MESSAGES.INVALID_DATE_RANGE,
    }
  }

  return { isValid: true }
}

/**
 * 폼 데이터를 API 페이로드로 변환
 */
export const createSchedulePayload = (
  formData: ScheduleFormData
): SchedulePayload => {
  const { testId, classId, duration, startDate, startTime, endDate, endTime } =
    formData

  return {
    testId: Number(testId),
    classId: Number(classId),
    durationMinutes: Number(duration),
    startAt: `${startDate}T${startTime}`,
    endAt: `${endDate}T${endTime}`,
  }
}

/**
 * 쪽지시험 목록을 드롭다운 옵션으로 변환
 */
export const mapQuizzesToOptions = (
  quizzes: QuizOption[]
): DropdownOption[] => {
  return quizzes.map((quiz) => ({
    label: quiz.title,
    value: String(quiz.id),
  }))
}

/**
 * 기수 목록을 드롭다운 옵션으로 변환
 */
export const mapClassesToOptions = (
  classes: ClassOption[]
): DropdownOption[] => {
  return classes.map((cls) => ({
    label: cls.name,
    value: String(cls.id),
  }))
}

/**
 * 날짜 시간 포맷 검증 (추가 유틸리티)
 */
export const isValidDateTime = (date: string, time: string): boolean => {
  if (!date || !time) return false

  const dateTime = new Date(`${date}T${time}`)
  return !isNaN(dateTime.getTime())
}

/**
 * 현재 시간 이후인지 검증
 */
export const isAfterNow = (date: string, time: string): boolean => {
  const dateTime = new Date(`${date}T${time}`)
  return dateTime > new Date()
}
