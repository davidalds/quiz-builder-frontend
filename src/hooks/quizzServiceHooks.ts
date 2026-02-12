import {
  getNewestsQuizzes,
  getPopularQuizzes,
  getQuiz,
  getQuizByUser,
  getQuizResult,
  getUserQuizzes,
} from '@/services/quizzService'
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'

export const useInfinityQuizzes = (search: string) => {
  return useInfiniteQuery({
    queryKey: ['quizzes'],
    queryFn: ({ pageParam }) => getNewestsQuizzes({ pageParam, search }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
}

export const useInfinityPopularQuizzes = () => {
  return useInfiniteQuery({
    queryKey: ['quizzes/popular'],
    queryFn: getPopularQuizzes,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
}

export const useUserQuizzes = (
  offset: number,
  limit: number,
  search: string,
) => {
  return useQuery({
    queryKey: ['user_quizzes', offset],
    queryFn: () => getUserQuizzes(offset, limit, search),
    placeholderData: keepPreviousData,
  })
}

export const useQuiz = (id: string) => {
  return useQuery({
    queryKey: ['quiz', id],
    queryFn: () => getQuiz(+id),
    enabled: !!id,
  })
}

export const useQuizByUser = (id: string) => {
  return useQuery({
    queryKey: ['user-quiz', id],
    queryFn: () => getQuizByUser(+id),
    enabled: !!id,
  })
}

export const useQuizResult = (id: string, guestId: string) => {
  return useQuery({
    queryKey: ['quiz_result', id],
    queryFn: () => getQuizResult(+id, guestId),
    enabled: !!id && !!guestId,
  })
}
