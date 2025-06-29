import ArrowIcon from '@assets/icons/input/arrow.svg?react'
import CheckIcon from '@assets/icons/input/check.svg?react'
import { Z_INDEX_DEFINE } from '@constants/zIndexDefine'
import { cn } from '@utils/cn'
import { useState } from 'react'

type Option = {
  label: string
  value: string
}

type DropdownProps = {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  wrapClassName?: string
}

const Dropdown = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  wrapClassName,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (selected: string) => {
    onChange(selected)
    setIsOpen(false)
  }

  const selectedLabel =
    options.find((op) => op.value === value)?.label ||
    placeholder ||
    options[0].label

  return (
    <div className={cn('relative flex w-[300px] flex-col', wrapClassName)}>
      <button
        type="button"
        id={id}
        name={name}
        value={value}
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen((prev) => !prev)
        }}
        className="flex h-[36px] w-full cursor-pointer items-center justify-between rounded-[4px] border-1 border-[#DDD] bg-white py-[10px] pr-[10px] pl-[12px] outline-none"
      >
        <span className="text-[14px] text-[#666]">{selectedLabel}</span>
        <ArrowIcon width={12} height={16} />
      </button>

      {isOpen && (
        <ul
          className="custom-scroll custom-shadow absolute top-full left-0 flex max-h-[175px] w-full translate-y-[2px] cursor-pointer flex-col overflow-visible overflow-y-auto rounded-[3px] border-1 border-[#DDD] bg-white text-[16px] font-[500] text-[#666]"
          style={{ zIndex: Z_INDEX_DEFINE.MODAL }}
        >
          {options.map((op) => {
            const isSelected = op.value === value

            return (
              <li
                key={op.value}
                onClick={() => handleSelect(op.value)}
                className={cn('flex justify-between px-[14px] py-[10px]', {
                  'bg-[#f2effd]': isSelected,
                })}
              >
                {op.label}
                {isSelected && <CheckIcon />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
