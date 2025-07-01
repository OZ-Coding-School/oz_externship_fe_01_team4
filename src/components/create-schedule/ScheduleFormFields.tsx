// @components/create-schedule/ScheduleFormFields.tsx
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
  const { FORM_FIELDS } = UI

  return (
    <div className="flex flex-col">
      {/* 과정 선택 (course_name) */}
      <div className={FORM_FIELDS.ROW_CONTAINER}>
        <Label htmlFor="course-select" labelText={UI.LABELS.FORM.COURSE_NAME} />
        <div className={FORM_FIELDS.INPUT_WRAPPER_OFFSET}>
          <Dropdown
            id="course-select"
            name="course"
            value={formData.course_name}
            onChange={(value) => onFieldChange('course_name', value)}
            options={courseOptions}
            placeholder={UI.PLACEHOLDERS.COURSE_NAME}
          />
        </div>
      </div>

      {/* 기수 선택 (generation_id) */}
      <div className={FORM_FIELDS.ROW_CONTAINER}>
        <Label
          htmlFor="generation-select"
          labelText={UI.LABELS.FORM.GENERATION_SELECT}
        />
        <div className={FORM_FIELDS.INPUT_WRAPPER_OFFSET}>
          <Dropdown
            id="generation-select"
            name="generation"
            value={formData.generation_id}
            onChange={(value) => onFieldChange('generation_id', value)}
            options={generationOptions}
            placeholder={UI.PLACEHOLDERS.GENERATION_SELECT}
          />
        </div>
      </div>

      {/* 시험 시간 (분 단위) (duration_time) */}
      <div className={FORM_FIELDS.ROW_CONTAINER}>
        <Label
          htmlFor="duration-time-input"
          labelText={UI.LABELS.FORM.DURATION_TIME}
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
            placeholder={UI.PLACEHOLDERS.DURATION_TIME}
          />
          <span className="whitespace-nowrap">
            {FORM_FIELDS.DURATION_UNIT_TEXT}
          </span>
        </div>
      </div>

      {/* 시험 시작 일시 (open_at) */}
      <div className={FORM_FIELDS.ROW_CONTAINER}>
        <Label htmlFor="start-date" labelText={UI.LABELS.FORM.OPEN_AT} />
        <div
          className={cn(
            'grid grid-cols-2 gap-2',
            FORM_FIELDS.INPUT_WRAPPER_OFFSET,
            'w-[300px]'
          )}
        >
          <Input
            id="start-date"
            name="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => onFieldChange('start_date', e.target.value)}
            placeholder=""
            aria-label={UI.LABELS.ARIA.START_DATE}
            wrapClassName="w-full"
          />
          <Input
            id="start-time"
            name="start_time"
            type="time"
            value={formData.start_time}
            onChange={(e) => onFieldChange('start_time', e.target.value)}
            placeholder=""
            aria-label={UI.LABELS.ARIA.START_TIME}
            wrapClassName="w-full"
          />
        </div>
      </div>

      {/* 시험 종료 일시 (close_at) */}
      <div className={FORM_FIELDS.ROW_CONTAINER}>
        <Label htmlFor="end-date" labelText={UI.LABELS.FORM.CLOSE_AT} />
        <div
          className={cn(
            'grid grid-cols-2 gap-2',
            FORM_FIELDS.INPUT_WRAPPER_OFFSET,
            'w-[300px]'
          )}
        >
          <Input
            id="end-date"
            name="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => onFieldChange('end_date', e.target.value)}
            placeholder=""
            aria-label={UI.LABELS.ARIA.END_DATE}
            wrapClassName="w-full"
          />
          <Input
            id="end-time"
            name="end_time"
            type="time"
            value={formData.end_time}
            onChange={(e) => onFieldChange('end_time', e.target.value)}
            placeholder=""
            aria-label={UI.LABELS.ARIA.END_TIME}
            wrapClassName="w-full"
          />
        </div>
      </div>
    </div>
  )
}
