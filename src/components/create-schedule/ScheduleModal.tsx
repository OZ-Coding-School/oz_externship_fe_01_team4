import { useCallback } from 'react'
import Modal from '@components/common/Modal'
import Button from '@components/common/Button'
import { useCustomToast } from '@hooks/toast/useToast'
import { ScheduleFormFields } from '@components/create-schedule/ScheduleFormFields'
import { useScheduleForm } from '@hooks/create-schedule/useScheduleForm'
import {
  FORM_LABELS,
  VALIDATION_MESSAGES,
  MODAL_CONFIG,
} from '@constants/create-schedule/createSchedule'
import type { ScheduleCreateModalProps } from '@custom-types/createSchedule'

const ScheduleCreateModal = ({
  isOpen,
  onClose,
  quizzes,
  classes,
  onSubmit,
}: ScheduleCreateModalProps) => {
  const toast = useCustomToast()

  const {
    formData,
    isSubmitting,
    updateFormField,
    resetForm,
    handleSubmit: handleFormSubmit,
  } = useScheduleForm()

  const handleModalClose = useCallback(() => {
    resetForm()
    onClose()
  }, [resetForm, onClose])

  const handleCreateButtonClick = async () => {
    const result = await handleFormSubmit(onSubmit)

    if (result.success) {
      toast.success(VALIDATION_MESSAGES.SUCCESS, { style: 'style4' })
      handleModalClose()
    } else {
      toast.error(result.error, { style: 'style4' })
    }
  }
  return (
    <Modal
      modalId={MODAL_CONFIG.ID}
      isOpen={isOpen}
      onClose={handleModalClose}
      paddingSize={MODAL_CONFIG.PADDING_SIZE}
    >
      <div className={`${MODAL_CONFIG.WIDTH} flex flex-col gap-4`}>
        <h2 className="text-[20px] font-semibold">{FORM_LABELS.MODAL_TITLE}</h2>

        <ScheduleFormFields
          formData={formData}
          onFieldChange={updateFormField}
          quizzes={quizzes}
          classes={classes}
        />

        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleCreateButtonClick}
            variant="VARIANT1"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? FORM_LABELS.SUBMITTING_BUTTON
              : FORM_LABELS.SUBMIT_BUTTON}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ScheduleCreateModal
