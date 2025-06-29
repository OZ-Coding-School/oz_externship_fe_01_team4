import QuestionInput from '@components/quizzes/add-quiz-modal/components/QuestionInput'
import QuestionOptionsEditor from '@components/quizzes/add-quiz-modal/components/QuestionOptionsEditor'
import ScoreSelector from '@components/quizzes/add-quiz-modal/components/ScoreSelector'
import SolutionInput from '@components/quizzes/add-quiz-modal/components/SolutionInput'

const MultipleChoice = () => {
  return (
    <div className="flex flex-col pb-[10px]">
      <QuestionInput />
      <QuestionOptionsEditor className="mt-[56px]" />
      <ScoreSelector className="mt-[30px]" />
      <SolutionInput className="mt-[34px]" />
    </div>
  )
}
export default MultipleChoice
