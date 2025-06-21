import SideBarMenuItem from '@components/Sidebar/SideBarMenuItem'
import type { MenuItem } from '@customType/menu'
import { useState } from 'react'

type Menu = {
  menuData: MenuItem[]
}

export default function SideBarMenu({ menuData }: Menu) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <aside>
      <div className="border border-[#ececec] h-full max-w-[261px]">
        <h1 className="text-2xl text-grey-500 font-semibold border-b border-[#F3EEFF] py-7 px-8">
          오즈코딩스쿨 관리자
        </h1>
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
