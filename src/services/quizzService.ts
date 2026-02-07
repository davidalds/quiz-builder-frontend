import type {
  ResponseInfiniteQuizzes,
  ResponseQuiz,
  ResponseQuizzes,
  Result,
} from '@/types/quizzes'
import { FetchApi } from '@/utils/fetchApi'
import type { QuizAPI } from '@/types/apiClient'

const fetchQuiz = new FetchApi<QuizAPI>()

export const getUserQuizzes = async (
  offset: number,
  limit: number,
  search: string,
): Promise<ResponseQuizzes> => {
  const res = await fetchQuiz.fetch('quizzes/user-quizzes', 'get', {
    offset,
    limit,
    search,
  })

  return {
    total: res.data.total,
    data: res.data.data,
  }
}

export const getNewestsQuizzes = async ({
  pageParam,
  search,
}: {
  pageParam: number
  search: string
}): Promise<ResponseInfiniteQuizzes> => {
  const res = await fetchQuiz.fetch('quizzes/', 'get', {
    cursor: pageParam,
    limit: 3,
    search: search,
  })

  return {
    total: res.data.total,
    data: res.data.data,
    nextCursor: res.data.nextCursor,
  }
}

export const getQuiz = async (id: number): Promise<ResponseQuiz> => {
  const { data } = await fetchQuiz.fetch(`quizzes/${id}`, 'get')
  return data
}

export const getQuizResult = async (
  id: number,
  guestId: string,
): Promise<Result> => {
  const { data } = await fetchQuiz.fetch(
    `quizzes/${id}/answers?guestId=${guestId}`,
    'get',
  )
  return data
}

export const getQuizByUser = async (id: number): Promise<ResponseQuiz> => {
  const { data } = await fetchQuiz.fetch(`quizzes/user-quizzes/${id}`, 'get')
  return data
}
