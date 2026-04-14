import type { Category } from './categories'
import type {
  Dashboard,
  ResponseInfiniteQuizzes,
  ResponseQuiz,
  ResponseQuizzes,
  Result,
} from './quizzes'
import type { ResultQuizzes } from './result'

export type methodsAPI = 'get' | 'post' | 'put' | 'patch' | 'delete'

export interface QuizAPI {
  'quizzes/': ResponseInfiniteQuizzes
  'quizzes/popular': ResponseInfiniteQuizzes
  'quizzes/user-quizzes': ResponseQuizzes
  'quizzes/dashboard': Dashboard
}

export interface QuizApiWithParams {
  [key: `quizzes/${string}`]: ResponseQuiz
  [key: `quizzes/user-quizzes/${number}`]: ResponseQuiz
  [key: `results?quizId=${string}&guestId=${string}`]: Result
}

export interface CategoryAPI {
  'categories/': Category[]
}

export interface ResultAPI {
  'results/quizzes': ResultQuizzes
}
