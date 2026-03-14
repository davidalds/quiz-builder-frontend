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
  category: string,
  search: string,
): Promise<ResponseQuizzes> => {
  const res = await fetchQuiz.fetch('quizzes/user-quizzes', 'get', {
    offset,
    limit,
    category,
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
  category,
}: {
  pageParam: number
  search: string
  category?: string
}): Promise<ResponseInfiniteQuizzes> => {
  const res = await fetchQuiz.fetch('quizzes/', 'get', {
    cursor: pageParam,
    limit: 10,
    search: search,
    category: category,
  })

  return {
    total: res.data.total,
    data: res.data.data,
    nextCursor: res.data.nextCursor,
  }
}

export const getPopularQuizzes = async ({
  pageParam,
}: {
  pageParam: number
}): Promise<ResponseInfiniteQuizzes> => {
  const res = await fetchQuiz.fetch('quizzes/popular', 'get', {
    cursor: pageParam,
    limit: 10,
  })

  return {
    total: res.data.total,
    data: res.data.data,
    nextCursor: res.data.nextCursor,
  }
}

export const getDashboardData = async () => {
  const { data } = await fetchQuiz.fetch(`quizzes/dashboard`, 'get')
  return data
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
    `results?quizId=${id}&guestId=${guestId}`,
    'get',
  )
  return data
}

export const getQuizByUser = async (id: number): Promise<ResponseQuiz> => {
  const { data } = await fetchQuiz.fetch(`quizzes/user-quizzes/${id}`, 'get')
  return data
}
