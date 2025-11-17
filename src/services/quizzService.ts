import type {
  responseQuiz,
  responseQuizzes,
  responseYourQuizzes,
  resultType,
} from '@/types/quizzes'
import { api } from '.'

export const getUserQuizzes = async (
  offset: number,
  limit: number,
): Promise<responseYourQuizzes> => {
  const res = await api.get<responseYourQuizzes>('quizzes/user-quizzes', {
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
}): Promise<responseQuizzes> => {
  const res = await api.get<responseQuizzes>('quizzes', {
    params: { cursor: pageParam, limit: 3 },
  })
  return {
    total: res.data.total,
    data: res.data.data,
    nextCursor: res.data.nextCursor,
  }
}

export const getQuiz = async (id: string): Promise<responseQuiz> => {
  const { data } = await api.get(`quizzes/${id}`)
  return data
}

export const getQuizResult = async (id: string): Promise<resultType> => {
  const { data } = await api.get(`quizzes/${id}/answers`)
  return data
}

export const getQuizByUser = async (id: string): Promise<responseQuiz> => {
  const { data } = await api.get(`quizzes/user-quizzes/${id}`)
  return data
}
