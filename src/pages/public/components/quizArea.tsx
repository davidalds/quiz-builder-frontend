import { Button } from '@/components/ui/button'
import ConfirmDialog from '@/components/ui/confirmDialog'
import DialogComponent from '@/components/ui/dialogComponent'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import SkeletonContent from '@/components/ui/skeletonContent'
import type { Question, QuestionForm, sendAnswerType } from '@/types/quizzes'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const defaultQuestions: QuestionForm[] = [
  {
    id: 1,
    text: '',
    checkedAnswerId: null,
    answers: [
      { id: 1, text: '' },
      { id: 2, text: '' },
      { id: 3, text: '' },
      { id: 4, text: '' },
      { id: 5, text: '' },
    ],
  },
]

type changeType = 'PREV' | 'NEXT'

interface IProps {
  questionsData: Question[] | undefined
  isLoading: boolean
  submitAnswer: (data: sendAnswerType[]) => Promise<void>
}

function QuizArea({ questionsData, isLoading, submitAnswer }: IProps) {
  const [questions, setQuestions] = useState<QuestionForm[]>(defaultQuestions)
  const [questionInd, setQuestionInd] = useState<number>(0)

  useEffect(() => {
    if (questionsData) {
      const formattedQuestions = questionsData.map((q) => ({
        ...q,
        checkedAnswerId: null,
      }))
      setQuestions(formattedQuestions)
    }
  }, [questionsData])

  const changeQuestion = (change: changeType) => {
    if (change === 'NEXT') {
      if (questionInd < questions.length - 1) {
        setQuestionInd((prev) => prev + 1)
      }
    } else {
      if (questionInd > 0) {
        setQuestionInd((prev) => prev - 1)
      }
    }
  }

  const handleCheckAnswer = (value: string) => {
    const questionId = questions[questionInd].id
    const newArrQuestions = questions.map((q) => {
      if (questionId === q.id) {
        return { ...q, checkedAnswerId: value }
      }
      return q
    })

    setQuestions(newArrQuestions)
  }

  const isAllQuestionsChecked = () => {
    return questions.every(({ checkedAnswerId }) => checkedAnswerId)
  }

  const countAllQuestionsChecked = () => {
    return questions.filter(({ checkedAnswerId }) => checkedAnswerId !== null)
      .length
  }

  const formatToAnswer = (questions: QuestionForm[]): sendAnswerType[] => {
    return questions.map(({ id, checkedAnswerId }) => ({
      questionId: id,
      answerId: +checkedAnswerId!,
    }))
  }

  const uncheckAllQuestions = () => {
    return questions.map(
      (q): QuestionForm => ({
        ...q,
        checkedAnswerId: null,
      }),
    )
  }

  const handleSubmit = async () => {
    if (!isAllQuestionsChecked()) {
      toast.warn('Não pode haver questões em branco!')
      return
    }
    submitAnswer(formatToAnswer(questions))
      .then(() => {
        setQuestionInd(0)
        setQuestions(uncheckAllQuestions())
        toast.success('Resposta enviada com sucesso!')
      })
      .catch(() => toast.error('Ocorreu um erro ao enviar respostas!'))
  }

  return (
    <div className="flex shadow-md p-4 rounded-md flex-grow flex-col gap-3 items-center">
      {isLoading ? (
        <SkeletonContent numberLines={8} lineH={10} />
      ) : (
        <>
          <div className="flex flex-col w-100 items-center">
            <Progress
              value={countAllQuestionsChecked() * (100 / questions.length)}
              className="w-[100%]"
            />
            <h3 className="font-bold">
              {countAllQuestionsChecked()} de {questions.length}
            </h3>
          </div>
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl font-bold">{questionInd + 1 + ')'}</h2>
            <h2 className="text-2xl text-center">
              {questions[questionInd].text}
            </h2>
          </div>
          <Separator />
          <div className="flex flex-grow items-center justify-between w-full">
            <Button
              disabled={questionInd > 0 ? false : true}
              onClick={() => changeQuestion('PREV')}
              className="bg-accent"
            >
              <ChevronLeft />
            </Button>
            <RadioGroup
              value={
                questions[questionInd].checkedAnswerId
                  ? questions[questionInd].checkedAnswerId
                  : ''
              }
              onValueChange={handleCheckAnswer}
            >
              {questions[questionInd].answers.map(({ id, text }) => (
                <div className="flex gap-3 items-center" key={id}>
                  <RadioGroupItem value={`${id}`} id={`${id}`} />
                  <Label htmlFor={`${id}`} className="text-xl">
                    {text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Button
              disabled={questionInd < questions.length - 1 ? false : true}
              onClick={() => changeQuestion('NEXT')}
              className="bg-accent"
            >
              <ChevronRight />
            </Button>
          </div>
          {isAllQuestionsChecked() ? (
            <DialogComponent btnTriggerText={'Finalizar Quiz'}>
              <ConfirmDialog
                title={'Deseja confirmar o envio das respostas?'}
                confirmCallback={handleSubmit}
              />
            </DialogComponent>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  )
}

export default QuizArea
