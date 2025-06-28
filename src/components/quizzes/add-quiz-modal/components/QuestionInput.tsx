import { cn } from '@utils/cn'

type QuestionInputProps = {
  className?: string
}
const QuestionInput = ({ className }: QuestionInputProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      <div className="text-[14px] font-semibold text-[#222222]">문제 입력</div>
      <textarea
        placeholder="문제를 입력해주세요"
        className="h-[70px] resize-none rounded-[3px] border border-[#DDDDDD] p-[12px] text-[14px] text-[#666666] outline-none"
      />
    </div>
  )
}
export default QuestionInput
