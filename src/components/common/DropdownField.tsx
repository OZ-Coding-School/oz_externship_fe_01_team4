import Dropdown from '@components/common/Dropdown'

type DropdownFieldProps = {
  label: string
  id: string
  value: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
}

const DropdownField = ({
  label,
  id,
  value,
  onChange,
  options,
}: DropdownFieldProps) => (
  <div className="flex items-center justify-between gap-3 py-1">
    <span className="text-sm whitespace-nowrap">{label}</span>
    <Dropdown
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      options={options}
      wrapClassName="w-full max-w-[360px]"
    />
  </div>
)

export default DropdownField
