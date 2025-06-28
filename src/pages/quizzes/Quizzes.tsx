import Button from '@components/common/Button'
import AddQuizModal from '@components/quizzes/add-quiz-modal/AddQuizModal'
import { useState } from 'react'

// 쪽지시험 관리
const Quizzes = () => {
  const [isAddQuizModalOpen, setIsAddQuizModalOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsAddQuizModalOpen(true)}>추가</Button>

      <AddQuizModal
        isOpen={isAddQuizModalOpen}
        onClose={() => {
          setIsAddQuizModalOpen(false)
        }}
      />
    </div>
  )
}
export default Quizzes
