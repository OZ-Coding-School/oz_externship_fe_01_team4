import Modal from '@components/common/Modal'
import Button from '@components/common/Button'
import { useCustomToast } from '@hooks/toast/useToast'
import { ScheduleFormFields } from '@components/create-schedule/ScheduleFormFields'
import { useScheduleForm } from '@hooks/create-schedule/useScheduleForm'
import { SCHEDULE_CONSTANTS } from '@constants/create-schedule/createSchedule'
import type { ScheduleCreateModalProps } from '@custom-types/createSchedule'

const ScheduleModal = ({
  isOpen,
  onClose,
  test_id,
  test_title,
  subject_title,
  courses,
  generations,
  onSubmit,
}: ScheduleCreateModalProps) => {
  const toast = useCustomToast()

  const {
    formData,
    isSubmitting,
    updateFormField,
    resetForm,
    handleSubmit: handleFormSubmit,
  } = useScheduleForm({
    onSubmit,
    test_id,
    courses,
    generations,
  })

  const { API, UI } = SCHEDULE_CONSTANTS

  const handleCreateButtonClick = async () => {
    const result = await handleFormSubmit()
    if (result.success) {
      toast.success(API.SUCCESS_MESSAGE, { style: 'style4' })
      resetForm()
      onClose()
    } else {
      toast.error(result.error, { style: 'style4' })
    }
  }

  return (
    <Modal
      modalId={UI.MODAL.ID}
      isOpen={isOpen}
      onClose={() => {
        resetForm()
        onClose()
      }}
      className={UI.MODAL.WIDTH}
    >
      <div className={UI.STYLES.MODAL.CONTAINER}>
        <h2 className={UI.STYLES.MODAL.TITLE}>{UI.LABELS.MODAL_TITLE}</h2>

        {/* 선택된 퀴즈 정보 표시 */}
        <div className={UI.STYLES.QUIZ_INFO.CONTAINER}>
          <div className={UI.STYLES.QUIZ_INFO.ITEM_CONTAINER}>
            <span className={UI.STYLES.QUIZ_INFO.LABEL}>
              {UI.LABELS.QUIZ_INFO.TEST_NAME}:
            </span>
            <span className={UI.STYLES.QUIZ_INFO.VALUE}>{test_title}</span>
          </div>
          <div className={UI.STYLES.QUIZ_INFO.ITEM_CONTAINER}>
            <span className={UI.STYLES.QUIZ_INFO.LABEL}>
              {UI.LABELS.QUIZ_INFO.SUBJECT_NAME}:
            </span>
            <span className={UI.STYLES.QUIZ_INFO.VALUE}>{subject_title}</span>
          </div>
        </div>

        <ScheduleFormFields
          formData={formData}
          onFieldChange={updateFormField}
          courses={courses}
          generations={generations}
        />

        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleCreateButtonClick}
            variant="VARIANT1"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? UI.LABELS.BUTTON.SUBMITTING
              : UI.LABELS.BUTTON.SUBMIT}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ScheduleModal
