import Tiptap from '@components/common/editor/TipTap'
import { cn } from '@utils/cn'

type SolutionInputProps = {
  className?: string
}

const SolutionInput = ({ className }: SolutionInputProps) => {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="mb-[10px] text-[14px] font-semibold text-[#222222]">
        해설 등록
      </div>
      <Tiptap />
    </div>
  )
}
export default SolutionInput
