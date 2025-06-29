import Dropdown from '@components/common/Dropdown'
import { cn } from '@utils/cn'
import { useState } from 'react'

type ScoreSelectorProps = {
  className?: string
}

const ScoreSelector = ({ className }: ScoreSelectorProps) => {
  const [score, setScore] = useState('')

  const scoreOptions = Array.from({ length: 10 }, (_, i) => {
    const value = (i + 1).toString()
    return { label: value, value }
  })

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="text-[14px] font-semibold text-[#222222]">배점 선택</div>
      <Dropdown
        id="score"
        name="score"
        value={score}
        onChange={setScore}
        options={scoreOptions}
        wrapClassName="w-[70px] h-[30px] mt-[12px]"
      />
    </div>
  )
}
export default ScoreSelector
