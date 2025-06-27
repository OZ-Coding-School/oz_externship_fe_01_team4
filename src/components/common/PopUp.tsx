import Modal from '@components/common/Modal'
import Icon from '@components/common/Icon'
import { cn } from '@utils/cn'

import SuccessIcon from '@assets/icons/popup/success.svg?react'
import WarningIcon from '@assets/icons/popup/error.svg?react'
import ErrorIcon from '@assets/icons/popup/deleteConfirm.svg?react'
import { POP_UP_TYPE, type PopUpType } from '@constants/popup/popUp'
import { PADDING_SIZE } from '@constants/modal/modal'
import type { ReactNode } from 'react'

const CIRCLE_TOP_HEIGHT = 37 - PADDING_SIZE.DEFAULT

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pt-[14px] text-[18px] font-semibold text-grey-600">
      {children}
    </div>
  )
}

const Description = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pt-[14px] text-center text-[14px] break-keep whitespace-pre-line text-grey-500">
      {children}
    </div>
  )
}

const Buttons = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute bottom-[24px] flex w-full justify-center gap-x-[6px] pt-4">
    {children}
  </div>
)

type PopUpProps = {
  isOpen: boolean
  onClose: () => void
  type: PopUpType
  children: ReactNode
}

const POP_UP_CONFIG = {
  [POP_UP_TYPE.SUCCESS]: {
    icon: SuccessIcon,
    iconBgColor: 'rgba(124,53,217,0.1)',
  },
  [POP_UP_TYPE.ERROR]: {
    icon: WarningIcon,
    iconBgColor: 'rgba(246,168,24,0.21)',
  },
  [POP_UP_TYPE.DELETE_CONFIRM]: {
    icon: ErrorIcon,
    iconBgColor: 'rgba(204,10,10,0.12)',
  },
}

const PopUp = ({ isOpen, onClose, type, children }: PopUpProps) => {
  const config = POP_UP_CONFIG[type]

  if (!config) {
    return null
  }

  return (
    <Modal
      modalId={`popup-${type}`}
      isOpen={isOpen}
      onClose={onClose}
      closeButtonOffset={13}
      className="h-[267px] w-[426px] items-center"
    >
      <div
        className={cn(
          'flex h-[60px] w-[60px] items-center justify-center rounded-[50%]'
        )}
        style={{
          backgroundColor: config.iconBgColor,
          marginTop: `${CIRCLE_TOP_HEIGHT}px`,
        }}
      >
        <Icon icon={config.icon} size={42} />
      </div>
      {children}
    </Modal>
  )
}

PopUp.Title = Title
PopUp.Description = Description
PopUp.Buttons = Buttons

export default PopUp
