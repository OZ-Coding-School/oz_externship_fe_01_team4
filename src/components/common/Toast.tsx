import { toast } from 'react-hot-toast'

import Icon from '@components/common/Icon'
import { cn } from '@utils/cn'
import {
  TOAST_CONSTANTS,
  WHITE_BG_STYLES,
  translucentBgMap,
} from '@constants/toast/toastConstants'
import {
  iconMap,
  type ToastStyle,
  type ToastType,
} from '@constants/toast/toastIconMap'
import { closeIconMap } from '@constants/toast/closeIconMap'
import { typeConfig } from '@constants/toast/toastTypeConfig'

export type CustomToastProps = {
  id: string
  message: string
  type?: ToastType
  style?: ToastStyle
  hasActionButton?: boolean
  actionLabel?: string
  onActionClick?: () => void
  hasCloseButton?: boolean
  hasIcon?: boolean
}

export const CustomToast = ({
  id,
  message,
  type = TOAST_CONSTANTS.DEFAULT_TYPE,
  style = TOAST_CONSTANTS.DEFAULT_STYLE,
  hasActionButton = true,
  actionLabel = TOAST_CONSTANTS.DEFAULT_ACTION_LABEL,
  onActionClick,
  hasCloseButton = true,
  hasIcon = true,
}: CustomToastProps) => {
  const config = typeConfig[type]

  const isWhiteBgStyle = WHITE_BG_STYLES.includes(
    style as (typeof WHITE_BG_STYLES)[number]
  )
  const isLeftBorderStyle = style === TOAST_CONSTANTS.STYLE.WHITE_LEFT_BORDER
  const isBorderStyle = style === TOAST_CONSTANTS.STYLE.WHITE_BORDER

  const ToastIcon = iconMap[type][style]
  const CloseIcon = closeIconMap[type][style]

  const actionButtonClassMap = {
    [TOAST_CONSTANTS.STYLE.SOLID_BLACK]: () =>
      type === TOAST_CONSTANTS.TYPE.DEFAULT
        ? 'text-white'
        : config.actionButtonTextColor,
    [TOAST_CONSTANTS.STYLE.SOLID_COLORED]: () =>
      type === TOAST_CONSTANTS.TYPE.DEFAULT ? 'text-black' : 'text-white',
  }

  const actionButtonTextClass =
    actionButtonClassMap[style as keyof typeof actionButtonClassMap]?.() ??
    config.actionButtonTextColor

  return (
    <div
      className={cn(TOAST_CONSTANTS.BASE_CLASSES, {
        'bg-black text-white': style === TOAST_CONSTANTS.STYLE.SOLID_BLACK,
        [config.bgColor]: style === TOAST_CONSTANTS.STYLE.SOLID_COLORED,
        [type === TOAST_CONSTANTS.TYPE.DEFAULT ? 'text-black' : 'text-white']:
          style === TOAST_CONSTANTS.STYLE.SOLID_COLORED,
        'bg-white text-black': isWhiteBgStyle,
        [translucentBgMap[type]]:
          isBorderStyle && type !== TOAST_CONSTANTS.TYPE.DEFAULT,
        'border-l-4': isLeftBorderStyle,
        [config.leftBorderColor]: isLeftBorderStyle,
        border: isBorderStyle,
        [config.toastBorderColor]: isBorderStyle,
      })}
    >
      <div className="flex flex-grow items-center gap-3">
        {hasIcon && ToastIcon && (
          <div className="flex flex-shrink-0 items-center justify-center">
            <Icon icon={ToastIcon} size={TOAST_CONSTANTS.MAIN_ICON_SIZE} />
          </div>
        )}
        <span>{message}</span>
      </div>

      <div className="flex flex-shrink-0 items-center gap-2">
        {hasActionButton && (
          <button
            className={cn(
              TOAST_CONSTANTS.ACTION_BUTTON_BASE_CLASSES,
              actionButtonTextClass
            )}
            onClick={() => {
              onActionClick?.()
              toast.dismiss(id)
            }}
          >
            {actionLabel}
          </button>
        )}
        {hasCloseButton && (
          <button
            onClick={() => toast.dismiss(id)}
            className={cn(TOAST_CONSTANTS.CLOSE_BUTTON_BASE_CLASSES, {
              [TOAST_CONSTANTS.CLOSE_BUTTON_HOVER_CLASSES]:
                style !== TOAST_CONSTANTS.STYLE.SOLID_BLACK,
            })}
            aria-label={TOAST_CONSTANTS.CLOSE_BUTTON_ARIA_LABEL}
          >
            <Icon
              icon={CloseIcon}
              size={TOAST_CONSTANTS.CLOSE_ICON_SIZE}
              color={
                style === TOAST_CONSTANTS.STYLE.SOLID_BLACK
                  ? TOAST_CONSTANTS.COLOR_WHITE
                  : config.actionButtonTextColor
              }
            />
          </button>
        )}
      </div>
    </div>
  )
}
