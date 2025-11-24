import { Separator } from '@/components/ui/separator'
import SkeletonContent from '@/components/ui/skeletonContent'
import type { quizLabelType } from '@/types/quizzes'

interface IProps {
  quiz: quizLabelType | undefined
  isLoading: boolean
}

function QuizLabel({ quiz, isLoading }: IProps) {
  return (
    <div className="flex flex-col gap-3 shadow-md p-4 rounded-md">
      {isLoading ? (
        <SkeletonContent numberLines={8} lineH={2} />
      ) : (
        <>
          <h1 className="text-2xl font-medium">{quiz!.title}</h1>
          <Separator />
          <p>{quiz!.description}</p>
          <p>
            <span className="font-medium mr-2">Criado por:</span>
            {quiz?.User?.name ?? 'User'}
          </p>
        </>
      )}
    </div>
  )
}

export default QuizLabel
