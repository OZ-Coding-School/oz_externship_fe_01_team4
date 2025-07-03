import Dropdown from '@components/common/Dropdown'

type Option = {
  label: string
  value: string
}

type DropdownFieldProps = {
  label: string
  id: string
  value: string
  onChange: (value: string) => void
  options: Option[]
}

const DropdownField = ({
  label,
  id,
  value,
  onChange,
  options,
}: DropdownFieldProps) => {
  const handleChange = (selected: Option) => {
    onChange(selected.value)
  }
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <span className="text-sm whitespace-nowrap">{label}</span>
      <Dropdown
        id={id}
        name={id}
        value={value}
        onChange={handleChange}
        options={options}
        wrapClassName="w-full max-w-[360px]"
      />
    </div>
  )
}

export default DropdownField
