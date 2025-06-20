import type { ComponentType, SVGProps } from 'react'

export type SvgIconComponent = ComponentType<SVGProps<SVGSVGElement>>

export type IconProps = {
  icon: SvgIconComponent
  size?: number | string
  color?: string
  className?: string
  classNameIcon?: string
}
