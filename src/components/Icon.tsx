import { type IconProps } from '@customType/icon'
import { cn } from '@utils/cn'

export default function Icon({
  icon: ImgIcon,
  size = 20,
  color = 'text-primary-600',
  className,
  classNameIcon,
}: IconProps) {
  return (
    <div className={cn(`flex items-center justify-center`, className)}>
      <ImgIcon
        className={cn(color, classNameIcon)}
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    </div>
  )
}
