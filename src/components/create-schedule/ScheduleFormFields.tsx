import Input from '@components/common/Input'
import Dropdown from '@components/common/Dropdown'
import Label from '@components/common/Label'
import { SCHEDULE_CONSTANTS } from '@constants/create-schedule/createSchedule'
import { mapClassesToOptions, mapCoursesToOptions } from '@utils/scheduleUtils'
import { cn } from '@utils/cn'
import type {
  ScheduleFormData,
  ClassOption,
} from '@custom-types/createSchedule'

type ScheduleFormFieldsProps = {
  formData: ScheduleFormData
  onFieldChange: (field: keyof ScheduleFormData, value: string) => void
  courses: ClassOption[]
  generations: ClassOption[]
}

export const ScheduleFormFields = ({
  formData,
  onFieldChange,
  courses,
  generations,
}: ScheduleFormFieldsProps) => {
  const courseOptions = mapCoursesToOptions(courses)
  const generationOptions = mapClassesToOptions(generations)

  const { UI, VALIDATION } = SCHEDULE_CONSTANTS
  const { FORM_FIELDS, STYLES } = UI
  const { SIZES } = FORM_FIELDS
  const { BORDER_FIRST, BORDER } = STYLES.FORM_ELEMENTS.FORM_ELEMENTS

  return (
    <div className="flex flex-col">
      {/* 과정 선택 (course_name) */}
      <div className={cn(FORM_FIELDS.ROW_CONTAINER, BORDER_FIRST)}>
        <Label
          htmlFor="course-select"
          labelText={UI.LABELS.FORM.COURSE_NAME}
          className={SIZES.LABEL}
        />
        <div className={FORM_FIELDS.INPUT_WRAPPER_OFFSET}>
          <Dropdown
            id="course-select"
            name="course"
            value={formData.course_name}
            onChange={(value) => onFieldChange('course_name', value)}
            options={courseOptions}
            placeholder={UI.PLACEHOLDERS.COURSE_NAME}
            wrapClassName={SIZES.COURSE_DROPDOWN}
          />
        </div>
      </div>

      {/* 기수 선택 (generation_id) */}
      <div className={cn(FORM_FIELDS.ROW_CONTAINER, BORDER)}>
        <Label
          htmlFor="generation-select"
          labelText={UI.LABELS.FORM.GENERATION_SELECT}
          className={SIZES.LABEL}
        />
        <div className={FORM_FIELDS.INPUT_WRAPPER_OFFSET}>
          <Dropdown
            id="generation-select"
            name="generation"
            value={formData.generation_id}
            onChange={(value) => onFieldChange('generation_id', value)}
            options={generationOptions}
            wrapClassName={SIZES.GENERATION_DROPDOWN}
          />
        </div>
      </div>

      {/* 시험 시간 (duration_time) */}
      <div className={cn(FORM_FIELDS.ROW_CONTAINER, BORDER)}>
        <Label
          htmlFor="duration-time-input"
          labelText={UI.LABELS.FORM.DURATION_TIME}
          className={SIZES.LABEL}
        />
        <div
          className={cn(
            'flex items-center gap-2',
            FORM_FIELDS.INPUT_WRAPPER_OFFSET
          )}
        >
          <Input
            id="duration-time-input"
            name="duration_time"
            type="number"
            min={VALIDATION.CONSTRAINTS.MIN_DURATION_TIME}
            value={formData.duration_time}
            onChange={(e) => onFieldChange('duration_time', e.target.value)}
            wrapClassName={SIZES.DURATION_INPUT}
          />
          <span className="whitespace-nowrap">
            {FORM_FIELDS.DURATION_UNIT_TEXT}
          </span>
        </div>
      </div>

      {/* 시험 시작 일시 (open_at) */}
      <div className={cn(FORM_FIELDS.ROW_CONTAINER, BORDER)}>
        <Label
          htmlFor="start-date"
          labelText={UI.LABELS.FORM.OPEN_AT}
          className={SIZES.LABEL}
        />
        <div
          className={cn(
            'flex items-center gap-2',
            FORM_FIELDS.INPUT_WRAPPER_OFFSET
          )}
        >
          <Input
            id="start-date"
            name="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => onFieldChange('start_date', e.target.value)}
            aria-label={UI.LABELS.ARIA.START_DATE}
            wrapClassName={SIZES.DATE_INPUT}
          />
          <Input
            id="start-time"
            name="start_time"
            type="time"
            value={formData.start_time}
            onChange={(e) => onFieldChange('start_time', e.target.value)}
            aria-label={UI.LABELS.ARIA.START_TIME}
            wrapClassName={SIZES.TIME_INPUT}
          />
        </div>
      </div>

      {/* 시험 종료 일시 (close_at) */}
      <div className={cn(FORM_FIELDS.ROW_CONTAINER, BORDER)}>
        <Label
          htmlFor="end-date"
          labelText={UI.LABELS.FORM.CLOSE_AT}
          className={SIZES.LABEL}
        />
        <div
          className={cn(
            'flex items-center gap-2',
            FORM_FIELDS.INPUT_WRAPPER_OFFSET
          )}
        >
          <Input
            id="end-date"
            name="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => onFieldChange('end_date', e.target.value)}
            aria-label={UI.LABELS.ARIA.END_DATE}
            wrapClassName={SIZES.DATE_INPUT}
          />
          <Input
            id="end-time"
            name="end_time"
            type="time"
            value={formData.end_time}
            onChange={(e) => onFieldChange('end_time', e.target.value)}
            aria-label={UI.LABELS.ARIA.END_TIME}
            wrapClassName={SIZES.TIME_INPUT}
          />
        </div>
      </div>
    </div>
  )
}
