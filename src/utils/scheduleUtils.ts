import type {
  ScheduleFormData,
  SchedulePayload,
  DropdownOption,
  ClassOption,
} from '@custom-types/createSchedule'

export const INITIAL_FORM_DATA: ScheduleFormData = {
  course_name: '',
  generation_id: '',
  duration_time: '',
  start_date: '',
  start_time: '',
  end_date: '',
  end_time: '',
}

/**
 * 폼 데이터를 API 페이로드로 변환
 */
export const createSchedulePayload = (
  formData: ScheduleFormData,
  testId: number
): SchedulePayload => {
  const {
    generation_id,
    duration_time,
    start_date,
    start_time,
    end_date,
    end_time,
  } = formData

  return {
    test_id: testId,
    generation_id: Number(generation_id),
    duration_time: Number(duration_time),
    open_at: `${start_date}T${start_time}`,
    close_at: `${end_date}T${end_time}`,
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
 * 과정 목록을 드롭다운 옵션으로 변환 (course_name 선택용)
 */
export const mapCoursesToOptions = (
  courses: ClassOption[]
): DropdownOption[] => {
  return courses.map((course) => ({
    label: course.name,
    value: course.name, // course_name은 문자열 값으로 저장
  }))
}
