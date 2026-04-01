import {
  getDashboardData,
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
    queryKey: ['quizzes', 'popular'],
    queryFn: getPopularQuizzes,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
}

export const useInfinityCategoriesQuizzes = (
  search: string,
  category?: string,
) => {
  return useInfiniteQuery({
    queryKey: ['quizzes', 'categories'],
    queryFn: ({ pageParam }) =>
      getNewestsQuizzes({ pageParam, search, category }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
}

export const useUserQuizzes = (
  offset: number,
  limit: number,
  category: string,
  search: string,
) => {
  return useQuery({
    queryKey: ['user_quizzes'],
    queryFn: () => getUserQuizzes(offset, limit, category, search),
    placeholderData: keepPreviousData,
  })
}

export const useQuiz = (id: number) => {
  return useQuery({
    queryKey: ['quiz', id],
    queryFn: () => getQuiz(id),
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

export const useQuizResult = (id: number, guestId: string) => {
  return useQuery({
    queryKey: ['quiz_result', id],
    queryFn: () => getQuizResult(id, guestId),
    enabled: !!id,
  })
}

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
  })
}
