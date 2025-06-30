import { type IconProps } from '@custom-types/icon'
import { cn } from '@utils/cn'

export default function Icon({
  icon: ImgIcon,
  size = 18,
  color = 'text-primary-600',
  className,
  iconClassName,
}: IconProps) {
  return (
    <div
      className={cn(`flex items-center justify-center`, className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <ImgIcon className={cn(color, iconClassName)} />
    </div>
  )
}
