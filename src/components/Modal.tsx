import Portal from '@components/Portal'
import { PORTAL_TARGET_ID } from '@constants/portalTargetId'
import { Z_INDEX_DEFINE } from '@constants/zIndexDefine'
import { useModalStore } from '@store/modalStore'
import { cn } from '@utils/cn'
import { useEffect, type ReactNode } from 'react'

type ModalProps = {
  modalId: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  hasCloseButton?: boolean
  isBackgroundDimmed?: boolean
}

const Modal = ({
  modalId,
  isOpen,
  onClose,
  children,
  className,
  hasCloseButton = true,
  isBackgroundDimmed = true,
}: ModalProps) => {
  const { openModal, closeModal, openModals, getTopModal } = useModalStore()

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
          'w-screen h-screen',
          'flex justify-center items-center',
          `z-[${currentZIndex}]`,
          { 'bg-black/20': isBackgroundDimmed }
        )}
        onClick={() => {
          if (isTopModal) {
            onClose()
            closeModal(modalId)
          }
        }}
      >
        <div
          className={cn('bg-white p-5 rounded-[6px] relative', className)}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          {hasCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-2.5 right-2.5 p-1 text-gray-500 hover:text-gray-700"
            >
              X{/* TODO: 아이콘으로 수정 필요 */}
            </button>
          )}
        </div>
      </div>
    </Portal>
  )
}
export default Modal
