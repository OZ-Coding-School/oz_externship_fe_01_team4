import Input from '@components/common/Input'
import Dropdown from '@components/common/Dropdown'
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  INPUT_CONSTRAINTS,
} from '@constants/create-schedule/createSchedule'
import { mapQuizzesToOptions, mapClassesToOptions } from '@utils/scheduleUtils'
import type {
  ScheduleFormData,
  QuizOption,
  ClassOption,
} from '@custom-types/createSchedule'

type ScheduleFormFieldsProps = {
  formData: ScheduleFormData
  onFieldChange: (field: keyof ScheduleFormData, value: string) => void
  quizzes: QuizOption[]
  classes: ClassOption[]
}

export const ScheduleFormFields = ({
  formData,
  onFieldChange,
  quizzes,
  classes,
}: ScheduleFormFieldsProps) => {
  const quizOptions = mapQuizzesToOptions(quizzes)
  const classOptions = mapClassesToOptions(classes)

  return (
    <>
      {/* 쪽지시험 선택 */}
      <div>
        <label htmlFor="quiz-select" className="mb-1 block text-sm font-medium">
          {FORM_LABELS.QUIZ_SELECT} *
        </label>
        <Dropdown
          id="quiz-select"
          name="quiz"
          value={formData.testId}
          onChange={(value) => onFieldChange('testId', value)}
          options={quizOptions}
          placeholder={FORM_PLACEHOLDERS.QUIZ_SELECT}
        />
      </div>

      {/* 기수 선택 */}
      <div>
        <label
          htmlFor="class-select"
          className="mb-1 block text-sm font-medium"
        >
          {FORM_LABELS.CLASS_SELECT} *
        </label>
        <Dropdown
          id="class-select"
          name="class"
          value={formData.classId}
          onChange={(value) => onFieldChange('classId', value)}
          options={classOptions}
          placeholder={FORM_PLACEHOLDERS.CLASS_SELECT}
        />
      </div>

      {/* 진행 시간 */}
      <div>
        <label
          htmlFor="duration-input"
          className="mb-1 block text-sm font-medium"
        >
          {FORM_LABELS.DURATION} *
        </label>
        <Input
          id="duration-input"
          name="duration"
          type="number"
          min={INPUT_CONSTRAINTS.MIN_DURATION}
          value={formData.duration}
          onChange={(e) => onFieldChange('duration', e.target.value)}
          placeholder={FORM_PLACEHOLDERS.DURATION}
        />
      </div>

      {/* 시작 일시 */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          {FORM_LABELS.START_DATETIME} *
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            id="start-date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => onFieldChange('startDate', e.target.value)}
            aria-label={FORM_LABELS.START_DATE_ARIA}
          />
          <Input
            id="start-time"
            name="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => onFieldChange('startTime', e.target.value)}
            aria-label={FORM_LABELS.START_TIME_ARIA}
          />
        </div>
      </div>

      {/* 종료 일시 */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          {FORM_LABELS.END_DATETIME} *
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            id="end-date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => onFieldChange('endDate', e.target.value)}
            aria-label={FORM_LABELS.END_DATE_ARIA}
          />
          <Input
            id="end-time"
            name="endTime"
            type="time"
            value={formData.endTime}
            onChange={(e) => onFieldChange('endTime', e.target.value)}
            aria-label={FORM_LABELS.END_TIME_ARIA}
          />
        </div>
      </div>
    </>
  )
}
