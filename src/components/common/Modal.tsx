import Icon from '@components/common/Icon'
import Portal from '@components/common/Portal'
import { PORTAL_TARGET_ID } from '@constants/portal/portalTargetId'
import { Z_INDEX_DEFINE } from '@constants/zIndexDefine'
import { useModalStore } from '@store/modalStore'
import { cn } from '@utils/cn'
import { useEffect, type ReactNode } from 'react'
import CloseIcon from '@assets/icons/modal/close.svg?react'
import { PADDING_SIZE } from '@constants/modal/modal'

type ModalProps = {
  modalId: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  hasCloseButton?: boolean
  closeButtonOffset?: number
  isBackgroundDimmed?: boolean
  paddingSize?: number
}

const Modal = ({
  modalId,
  isOpen,
  onClose,
  children,
  className,
  hasCloseButton = true,
  closeButtonOffset,
  isBackgroundDimmed = true,
  paddingSize = PADDING_SIZE.DEFAULT,
}: ModalProps) => {
  const { openModal, closeModal, openModals, getTopModal } = useModalStore()
  const closeButtonPosition = closeButtonOffset ?? paddingSize

  useEffect(() => {
    if (isOpen) {
      openModal(modalId)
    } else {
      closeModal(modalId)
    }

    return () => {
      closeModal(modalId)
    }
  }, [isOpen, modalId, openModal, closeModal])

  if (!openModals.includes(modalId)) {
    return null
  }

  const topModalId = getTopModal()
  const isTopModal = topModalId === modalId
  const currentZIndex = Z_INDEX_DEFINE.MODAL + openModals.indexOf(modalId) * 10

  return (
    <Portal targetId={PORTAL_TARGET_ID.MODAL}>
      <div
        className={cn(
          'fixed inset-0',
          'h-screen w-screen',
          'flex items-center justify-center',
          { 'bg-black/20': isBackgroundDimmed }
        )}
        style={{
          zIndex: currentZIndex,
        }}
        onClick={() => {
          if (isTopModal) {
            onClose()
            closeModal(modalId)
          }
        }}
      >
        <div
          className={cn(
            'modal-shadow relative flex flex-col rounded-[6px] bg-white',
            className
          )}
          style={{
            padding: `${paddingSize}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          {hasCloseButton && (
            <button
              onClick={onClose}
              className="absolute cursor-pointer"
              style={{
                top: `${closeButtonPosition}px`,
                right: `${closeButtonPosition}px`,
              }}
            >
              <Icon icon={CloseIcon} size={24} />
            </button>
          )}
        </div>
      </div>
    </Portal>
  )
}
export default Modal
