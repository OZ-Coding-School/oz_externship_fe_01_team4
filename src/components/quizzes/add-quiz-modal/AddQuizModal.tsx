import Button from '@components/common/Button'
import Modal from '@components/common/Modal'
import Sidebar from '@components/quizzes/add-quiz-modal/components/Sidebar'
import FillInTheBlanks from '@components/quizzes/add-quiz-modal/pages/FillInTheBlanks'
import MultipleChoice from '@components/quizzes/add-quiz-modal/pages/MultipleChoice'
import SortByOrder from '@components/quizzes/add-quiz-modal/pages/SortByOrder'
import SubjectiveShortAnswer from '@components/quizzes/add-quiz-modal/pages/SubjectiveShortAnswer'
import TrueOrFalse from '@components/quizzes/add-quiz-modal/pages/TrueOrFalse'
import { PADDING_SIZE } from '@constants/modal/modal'
import { useState } from 'react'

const SIDEBAR_ITEMS = [
  {
    title: '다지선다형',
    page: <MultipleChoice />,
  },
  {
    title: '참/거짓형 (O/X)',
    page: <TrueOrFalse />,
  },
  {
    title: '순서 정렬',
    page: <SortByOrder />,
  },
  {
    title: '주관식 단답형',
    page: <SubjectiveShortAnswer />,
  },
  {
    title: '빈칸 채우기',
    page: <FillInTheBlanks />,
  },
]

type AddQuizModalProps = {
  isOpen: boolean
  onClose: () => void
}

const AddQuizModal = ({ isOpen, onClose }: AddQuizModalProps) => {
  const [currentTab, setCurrentTab] = useState(0)

  return (
    <Modal
      modalId="quizzes-add-quiz-modal"
      isOpen={isOpen}
      onClose={onClose}
      paddingSize={PADDING_SIZE.NONE}
      closeButtonOffset={26}
      className="h-[750px] w-[790px] flex-row"
    >
      <Sidebar
        items={SIDEBAR_ITEMS}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <form className="mt-[75px] flex w-full flex-col justify-between">
        <div className="flex flex-col overflow-y-auto px-[24px]">
          {SIDEBAR_ITEMS[currentTab].page}
        </div>
        <div className="flex justify-end pr-[30px] pb-[30px]">
          <Button>추가</Button>
        </div>
      </form>
    </Modal>
  )
}
export default AddQuizModal
