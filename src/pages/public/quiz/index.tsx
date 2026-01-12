import { useQuiz, useQuizResult } from '@/hooks/quizzServiceHooks'
import QuizArea from '../components/quizArea'
import QuizLabel from '../components/ui/quizLabel'
import { useParams } from 'react-router'
import AlertComponent from '@/components/ui/alertComponent'
import type { sendAnswerType } from '@/types/quizzes'
import { api } from '@/services'
import { useQueryClient } from '@tanstack/react-query'
import DialogComponent from '@/components/ui/dialogComponent'
import ResultDialog from '../components/ui/resultDialog'
import { useCookie } from '@/context/useCookie'

function QuizPage() {
  const params = useParams()
  const { guestId } = useCookie()
  const { data, isError, isLoading } = useQuiz(params.id!)
  const { data: dataQuizResult } = useQuizResult(params.id!, guestId)
  const queryClient = useQueryClient()

  const submitAnswer = async (data: sendAnswerType[]): Promise<void> => {
    try {
      await api.post(`quizzes/${params.id}/answers`, {
        userAnswers: data,
        guestId,
      })

      queryClient.invalidateQueries({ queryKey: ['quiz_result', params.id] })

      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  }

  return (
    <div className="flex flex-col flex-grow gap-2">
      {isError ? (
        <AlertComponent
          title="Não foi possível carregar informações do quiz"
          alertType="error"
        >
          Ocorreu um erro ao carregar informações do quiz
        </AlertComponent>
      ) : (
        <>
          <QuizLabel quiz={data} isLoading={isLoading} />
          {dataQuizResult ? (
            <AlertComponent
              alertType={'success'}
              title={'Você já respondeu a esse quiz!'}
            >
              <DialogComponent btnTriggerText={'Mostrar Resultado'}>
                <ResultDialog
                  score={dataQuizResult.score}
                  Quiz={dataQuizResult.Quiz}
                />
              </DialogComponent>
            </AlertComponent>
          ) : (
            <></>
          )}
          <QuizArea
            questionsData={data?.questions}
            isLoading={isLoading}
            submitAnswer={submitAnswer}
          />
        </>
      )}
    </div>
  )
}

export default QuizPage
