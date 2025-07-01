import { useCallback } from 'react'
import Modal from '@components/common/Modal'
import Button from '@components/common/Button'
import { useCustomToast } from '@hooks/toast/useToast'
import { ScheduleFormFields } from '@components/create-schedule/ScheduleFormFields'
import { useScheduleForm } from '@hooks/create-schedule/useScheduleForm'
import { SCHEDULE_CONSTANTS } from '@constants/create-schedule/createSchedule'
import { quizAPI } from '../../api/scheduleApi'
import type {
  ScheduleCreateModalProps,
  SchedulePayload,
} from '@custom-types/createSchedule'
import { cn } from '@utils/cn'

const ScheduleModal = ({
  isOpen,
  onClose,
  selectedQuiz,
  courses,
  generations,
}: ScheduleCreateModalProps) => {
  const toast = useCustomToast()
  const { UI, API } = SCHEDULE_CONSTANTS

  // API 호출 핸들러
  const handleSubmit = async (payload: SchedulePayload) => {
    await quizAPI.setDeploySchedule(payload)
  }

  const {
    formData,
    isSubmitting,
    updateFormField,
    resetForm,
    handleSubmit: handleFormSubmit,
  } = useScheduleForm({
    onSubmit: handleSubmit,
    selectedQuiz,
    courses,
    generations,
  })

  const handleModalClose = useCallback(() => {
    resetForm()
    onClose()
  }, [resetForm, onClose])

  const handleCreateButtonClick = useCallback(async () => {
    const result = await handleFormSubmit()

    if (result.success) {
      toast.success(API.SUCCESS_MESSAGE, { style: 'style4' })
      handleModalClose()
    } else {
      toast.error(result.error, { style: 'style4' })
    }
  }, [handleFormSubmit, toast, handleModalClose, API.SUCCESS_MESSAGE])

  return (
    <Modal
      modalId={UI.MODAL.ID}
      isOpen={isOpen}
      onClose={handleModalClose}
      className={cn(UI.MODAL.WIDTH, UI.MODAL.HEIGHT)}
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-[18px] font-semibold text-black">
          {UI.LABELS.MODAL_TITLE}
        </h2>

        {/* 선택된 퀴즈 정보 표시 */}
        {selectedQuiz && (
          <div className={UI.STYLES.QUIZ_INFO.CONTAINER}>
            <div className={UI.STYLES.QUIZ_INFO.ITEM_CONTAINER}>
              <span
                className={`text-[14px] ${UI.STYLES.QUIZ_INFO.LABEL}`}
                style={{ color: '#666666' }}
              >
                {UI.LABELS.QUIZ_INFO.TEST_NAME}:
              </span>
              <span className={`text-[14px] ${UI.STYLES.QUIZ_INFO.VALUE}`}>
                {selectedQuiz.test_title}
              </span>
            </div>
            <div className={UI.STYLES.QUIZ_INFO.ITEM_CONTAINER}>
              <span
                className={`text-[14px] ${UI.STYLES.QUIZ_INFO.LABEL}`}
                style={{ color: '#666666' }}
              >
                {UI.LABELS.QUIZ_INFO.SUBJECT_NAME}:
              </span>
              <span className={`text-[14px] ${UI.STYLES.QUIZ_INFO.VALUE}`}>
                {selectedQuiz.subject_title}
              </span>
            </div>
          </div>
        )}

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
