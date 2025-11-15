import { useQuiz, useQuizResult } from '@/hooks/quizzServiceHooks'
import QuizArea from '../components/quizArea'
import QuizLabel from '../components/ui/quizLabel'
import { useParams } from 'react-router'
import AlertComponent from '@/components/ui/alertComponent'
import type { sendAnswerType } from '@/types/quizzes'
import { api } from '@/services'
import { useQueryClient } from '@tanstack/react-query'

function QuizPage() {
  const params = useParams()
  const { data, isError, isLoading } = useQuiz(params.id!)
  const { data: dataQuizResult } = useQuizResult(params.id!)
  const queryClient = useQueryClient()

  const submitAnswer = async (data: sendAnswerType[]): Promise<void> => {
    try {
      await api.post(`quizzes/${params.id}/answers`, { userAnswers: data })
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
              title={'Já existe uma resposta para esse quiz!'}
            >
              <span className="text-lg">
                Você já respondeu a esse quiz e obteve uma pontuação de{' '}
                <strong>{dataQuizResult.score}</strong> ponto(s)
              </span>
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
