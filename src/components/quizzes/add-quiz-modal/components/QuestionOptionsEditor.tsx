import AddIcon from '@assets/icons/quizzes/add-quiz-modal/add.svg?react'
import Icon from '@components/common/Icon'
import QuestionOption from '@components/quizzes/add-quiz-modal/components/QuestionOption'
import { cn } from '@utils/cn'
import { useState } from 'react'

type Option = {
  id: number
  text: string
  isCorrect: boolean
}

type QuestionOptionsEditorProps = {
  className?: string
}

const QuestionOptionsEditor = ({ className }: QuestionOptionsEditorProps) => {
  const [options, setOptions] = useState<Option[]>([
    { id: Date.now(), text: '', isCorrect: true },
  ])

  // 보기 텍스트 변경 핸들러
  const handleTextChange = (id: number, text: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, text } : option
      )
    )
  }

  // 정답 체크 변경 핸들러 (하나만 정답이 되도록 설정)
  const handleCorrectChange = (id: number, isCorrect: boolean) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) => ({
        ...option,
        isCorrect: option.id === id ? isCorrect : false,
      }))
    )
  }

  // 보기 추가 핸들러
  const handleAddOption = () => {
    // 최대 5개까지만 추가
    if (options.length < 5) {
      const newOption = { id: Date.now(), text: '', isCorrect: false }
      setOptions([...options, newOption])
    }
  }

  // 보기 삭제 핸들러
  const handleDeleteOption = (id: number) => {
    // 최소 1개의 보기는 유지
    if (options.length > 1) {
      setOptions((prevOptions) =>
        prevOptions.filter((option) => option.id !== id)
      )
    }
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="text-[14px] font-semibold text-[#222222]">
        문제 보기 등록
      </div>
      <div className="mt-[6px] text-[10px] text-[#666666]">
        <div>
          다지선다형 문제 유형은 최대 5개까지 보기를 등록할 수 있습니다.
        </div>
        <div>정답 보기는 체크박스를 체크하여 등록해주세요.</div>
      </div>
      <div className="relative mt-[8px] min-h-[210px] rounded-[4px] bg-[#F7F7F7] px-[12px] pt-[24px]">
        {/* 추가하기 버튼 */}
        <button
          type="button"
          onClick={handleAddOption}
          disabled={options.length >= 5} // 5개 이상이면 비활성화
          className="absolute top-[-18px] right-0 flex h-[12px] cursor-pointer items-center gap-[2px] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon icon={AddIcon} size={12} />
          <div className="text-[10px] text-[#522193]">추가하기</div>
        </button>

        {/* 보기 목록 렌더링 */}
        <div className="flex flex-col gap-y-[12px]">
          {options.map((option, index) => (
            <QuestionOption
              key={option.id}
              option={option}
              index={index}
              onTextChange={handleTextChange}
              onCorrectChange={handleCorrectChange}
              onDelete={handleDeleteOption}
              isDeletable={options.length > 1} // 보기가 1개 초과일 때만 삭제 가능
            />
          ))}
        </div>
      </div>
      <div className="mt-[7px] text-[10px] text-[#666666]">
        * 최소 1개 이상의 정답을 체크해야합니다.
      </div>
    </div>
  )
}

export default QuestionOptionsEditor
