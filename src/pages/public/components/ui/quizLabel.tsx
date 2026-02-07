import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import SkeletonContent from '@/components/ui/skeletonContent'
import type { QuizLabel as QuizLabelProps } from '@/types/quizzes'

interface IProps {
  quiz: QuizLabelProps | undefined
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
            <Badge className="bg-accent">{quiz?.User?.name ?? 'User'}</Badge>
          </p>
        </>
      )}
    </div>
  )
}

export default QuizLabel
