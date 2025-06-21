import type { SVGProps } from 'react'

export type SubMenuItem = {
  name: string
  path: string
}

export type MenuItem = {
  menuIcon: React.FC<SVGProps<SVGSVGElement>>
  mainMenu: string
  subMenu: SubMenuItem[]
}
