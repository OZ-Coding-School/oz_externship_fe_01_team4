import { SCHEDULE_CONSTANTS } from '@constants/create-schedule/createSchedule'
import type {
  ScheduleFormData,
  FormValidationResult,
  SchedulePayload,
  DropdownOption,
  ClassOption,
  Quiz,
} from '@custom-types/createSchedule'

export const INITIAL_FORM_DATA: ScheduleFormData = {
  course_name: '', // 과정 선택 필드 추가
  generation_id: '',
  duration_time: '',
  start_date: '',
  start_time: '',
  end_date: '',
  end_time: '',
}

/**
 * 폼 데이터 유효성 검사
 */
export const validateScheduleForm = (
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

/**
 * 폼 데이터를 API 페이로드로 변환
 */
export const createSchedulePayload = (
  formData: ScheduleFormData,
  selectedQuiz: Quiz | null
): SchedulePayload => {
  if (!selectedQuiz) {
    throw new Error('선택된 퀴즈가 없습니다.')
  }

  const {
    generation_id,
    duration_time,
    start_date,
    start_time,
    end_date,
    end_time,
  } = formData

  return {
    test_id: selectedQuiz.test_id, // course_name 대신 test_id 사용
    generation_id: Number(generation_id),
    duration_time: Number(duration_time),
    open_at: `${start_date}T${start_time}:00`, // 초 추가
    close_at: `${end_date}T${end_time}:00`, // 초 추가
  }
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
 * 과정 목록을 드롭다운 옵션으로 변환
 */
export const mapCoursesToOptions = (
  courses: ClassOption[]
): DropdownOption[] => {
  return courses.map((course) => ({
    label: course.name,
    value: course.name, // course_name은 문자열 값으로 저장
  }))
}
