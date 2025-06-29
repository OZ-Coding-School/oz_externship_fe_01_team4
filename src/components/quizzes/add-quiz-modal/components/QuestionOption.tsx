import CustomCheckbox from '@components/quizzes/add-quiz-modal/components/CustomCheckbox'
import DeleteIcon from '@assets/icons/quizzes/add-quiz-modal/delete.svg?react'
import Icon from '@components/common/Icon'
import { cn } from '@utils/cn'

type QuestionOptionProps = {
  option: { id: number; text: string; isCorrect: boolean }
  index: number
  onTextChange: (id: number, text: string) => void
  onCorrectChange: (id: number, isCorrect: boolean) => void
  onDelete: (id: number) => void
  isDeletable: boolean
}

const QuestionOption = ({
  option,
  index,
  onTextChange,
  onCorrectChange,
  onDelete,
  isDeletable,
}: QuestionOptionProps) => {
  return (
    <div className="flex items-center">
      <div className="ml-[14px] min-w-[27px] text-[12px] text-[#666666]">
        {index + 1}.
      </div>
      <input
        type="text"
        value={option.text}
        onChange={(e) => onTextChange(option.id, e.target.value)}
        className={cn(
          'h-[30px] w-full',
          'border border-[#DDDDDD] bg-white text-[12px] text-[#666666]',
          'rounded-[3px] pl-[10px] outline-none'
        )}
        placeholder="보기를 입력해주세요."
      />
      <CustomCheckbox
        checked={option.isCorrect}
        onChange={(checked) => onCorrectChange(option.id, checked)}
        className="ml-[23px]"
      />
      <button onClick={() => onDelete(option.id)} disabled={!isDeletable}>
        <Icon
          icon={DeleteIcon}
          size={12}
          className={cn(
            'mr-[25px] ml-[20px]',
            { 'cursor-not-allowed opacity-50': !isDeletable } // 삭제 불가능할 때 스타일
          )}
        />
      </button>
    </div>
  )
}

export default QuestionOption
