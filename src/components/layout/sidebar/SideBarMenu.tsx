import SideBarMenuItem from '@components/layout/sidebar/SideBarMenuItem'
import type { MenuItem } from '@custom-types/menu'
import { useState } from 'react'

type Menu = {
  menuData: MenuItem[]
}

export default function SideBarMenu({ menuData }: Menu) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <aside>
      <div className="h-full max-w-[261px] border border-[#ececec]">
        <div className="flex h-[80px] items-center border-b border-[#F3EEFF] px-8">
          <h1 className="text-2xl font-semibold text-grey-500">
            오즈코딩스쿨 관리자
          </h1>
        </div>
        <ul>
          {menuData.map((menu) => (
            <SideBarMenuItem
              key={menu.mainMenu}
              menu={menu}
              isOpen={openMenu === menu.mainMenu}
              onToggle={() =>
                setOpenMenu(openMenu === menu.mainMenu ? null : menu.mainMenu)
              }
            />
          ))}
        </ul>
      </div>
    </aside>
  )
}
