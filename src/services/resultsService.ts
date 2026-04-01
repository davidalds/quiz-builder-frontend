import type { ResultAPI } from '@/types/apiClient'
import { FetchApi } from '@/utils/fetchApi'

const fetchResult = new FetchApi<ResultAPI>()

export const getResultQuizzes = async (offset: number, limit: number) => {
  const {
    data: { total, quizzes },
  } = await fetchResult.fetch('results/quizzes', 'get', {
    offset,
    limit,
  })

  return {
    total,
    quizzes,
  }
}
