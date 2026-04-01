import { getResultQuizzes } from '@/services/resultsService'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useResultQuizzes = (offset: number, limit: number) => {
  return useQuery({
    queryKey: ['resultQuizzes'],
    queryFn: () => getResultQuizzes(offset, limit),
    placeholderData: keepPreviousData,
  })
}
