import CheckboxCheckedIcon from '@assets/icons/quizzes/add-quiz-modal/checkboxChecked.svg?react'
import CheckboxIcon from '@assets/icons/quizzes/add-quiz-modal/checkbox.svg?react'
import Icon from '@components/common/Icon'
import { cn } from '@utils/cn'

interface CustomCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void

  className?: string
  name?: string
  disabled?: boolean
  ariaLabel?: string
}

const CustomCheckbox = ({
  checked,
  onChange,
  className,
  name,
  disabled = false,
}: CustomCheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <label
      className={cn(
        'relative flex cursor-pointer items-center select-none',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      onClick={handleClick}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="sr-only"
        name={name}
        disabled={disabled}
      />
      <div className="flex items-center">
        {checked ? (
          <Icon size={16} icon={CheckboxCheckedIcon} />
        ) : (
          <Icon size={16} icon={CheckboxIcon} />
        )}
      </div>
    </label>
  )
}

export default CustomCheckbox
