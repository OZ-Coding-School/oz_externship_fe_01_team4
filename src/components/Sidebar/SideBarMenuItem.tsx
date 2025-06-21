import Icon from '@components/Icon'
import type { MenuItem } from '@customType/menu'
import UpIcon from '@assets/icons/sidebar/up.svg?react'
import DownIcon from '@assets/icons/sidebar/down.svg?react'
import { cn } from '@utils/cn'
import { useState } from 'react'
import { Link } from 'react-router'

type MenuProps = {
  menu: MenuItem
  isOpen: boolean
  onToggle: () => void
}

export default function SideBarMenuItem({ menu, isOpen, onToggle }: MenuProps) {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)

  return (
    <li key={menu.mainMenu} className="w-full">
      <button
        className={cn(
          'text-primary-600 text-[18px] cursor-pointer flex items-center justify-between py-5 px-8 w-full',
          isOpen ? 'bg-[#EDE6FFB0]' : ''
        )}
        onClick={onToggle}
      >
        <div className="flex gap-2">
          <Icon icon={menu.menuIcon} size={20} />
          <span className="text-primary-600 text-[18px]">{menu.mainMenu}</span>
        </div>
        <Icon icon={isOpen ? DownIcon : UpIcon} size={12} />
      </button>
      {isOpen && (
        <ul>
          {menu.subMenu.map((el) => (
            <li key={el.name}>
              <Link to={el.path}>
                <button
                  className={cn(
                    'px-10 text-sm cursor-pointer py-3',
                    selectedMenu === el.name
                      ? 'text-primary-600'
                      : 'text-grey-500'
                  )}
                  onClick={() => setSelectedMenu(el.name)}
                >
                  <span>- {el.name}</span>
                </button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
