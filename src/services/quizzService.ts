import type {
  QuizStatus,
  ResponseInfiniteQuizzes,
  ResponseQuiz,
  ResponseQuizzes,
  Result,
} from '@/types/quizzes'
import { FetchApi } from '@/utils/fetchApi'
import type { QuizAPI, QuizApiWithParams } from '@/types/apiClient'
import { apiErrorsHandle } from '@/utils/apiErrorsHandle'

const fetchQuiz = new FetchApi<QuizAPI>()
const fecthQuizWithParams = new FetchApi<QuizApiWithParams>()

export const getUserQuizzes = async (
  offset: number,
  limit: number,
  category: string,
  status: QuizStatus | undefined,
  search: string,
): Promise<ResponseQuizzes> => {
  const res = await fetchQuiz.fetch('quizzes/user-quizzes', 'get', {
    offset,
    limit,
    category,
    status,
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
  pageParam: string
  search: string
  category?: string
}): Promise<ResponseInfiniteQuizzes> => {
  try {
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
  } catch (err) {
    throw new Error(apiErrorsHandle(err))
  }
}

export const getPopularQuizzes = async ({
  pageParam,
  search,
  category,
}: {
  pageParam: string
  search: string
  category?: string
}): Promise<ResponseInfiniteQuizzes> => {
  try {
    const res = await fetchQuiz.fetch('quizzes/popular', 'get', {
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
  } catch (err) {
    throw new Error(apiErrorsHandle(err))
  }
}

export const getDashboardData = async () => {
  const { data } = await fetchQuiz.fetch(`quizzes/dashboard`, 'get')
  return data
}

export const getQuiz = async (id: string): Promise<ResponseQuiz> => {
  try {
    const { data } = await fecthQuizWithParams.fetch(`quizzes/${id}`, 'get')
    return data
  } catch (error) {
    throw Error(apiErrorsHandle(error))
  }
}

export const getQuizResult = async (
  id: string,
  guestId: string,
): Promise<Result> => {
  const { data } = await fecthQuizWithParams.fetch(
    `results?quizId=${id}&guestId=${guestId}`,
    'get',
  )
  return data
}

export const getQuizByUser = async (id: number): Promise<ResponseQuiz> => {
  try {
    const { data } = await fecthQuizWithParams.fetch(
      `quizzes/user-quizzes/${id}`,
      'get',
    )
    return data
  } catch (err) {
    throw new Error(apiErrorsHandle(err))
  }
}
