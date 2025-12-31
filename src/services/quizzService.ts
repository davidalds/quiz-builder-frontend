import type {
  ResponseInfiniteQuizzes,
  ResponseQuiz,
  ResponseQuizzes,
  Result,
} from '@/types/quizzes'
import { api } from '.'

export const getUserQuizzes = async (
  offset: number,
  limit: number,
): Promise<ResponseQuizzes> => {
  const res = await api.get<ResponseQuizzes>('quizzes/user-quizzes', {
    params: { offset: offset, limit: limit },
  })
  return {
    total: res.data.total,
    data: res.data.data,
  }
}

export const getNewestsQuizzes = async ({
  pageParam,
}: {
  pageParam: number
}): Promise<ResponseInfiniteQuizzes> => {
  const res = await api.get<ResponseInfiniteQuizzes>('quizzes', {
    params: { cursor: pageParam, limit: 3 },
  })
  return {
    total: res.data.total,
    data: res.data.data,
    nextCursor: res.data.nextCursor,
  }
}

export const getQuiz = async (id: string): Promise<ResponseQuiz> => {
  const { data } = await api.get(`quizzes/${id}`)
  return data
}

export const getQuizResult = async (
  id: string,
  guestId?: string,
): Promise<Result> => {
  const { data } = await api.get(
    `quizzes/${id}/answers?guestId=${guestId ?? ''}`,
  )
  return data
}

export const getQuizByUser = async (id: string): Promise<ResponseQuiz> => {
  const { data } = await api.get(`quizzes/user-quizzes/${id}`)
  return data
}
