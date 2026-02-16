import type {
  Dashboard,
  ResponseInfiniteQuizzes,
  ResponseQuiz,
  ResponseQuizzes,
  Result,
} from './quizzes'

export type methodsAPI = 'get' | 'post' | 'put' | 'patch' | 'delete'

export interface QuizAPI {
  'quizzes/': ResponseInfiniteQuizzes
  'quizzes/popular': ResponseInfiniteQuizzes
  'quizzes/user-quizzes': ResponseQuizzes
  'quizzes/dashboard': Dashboard
  [key: `quizzes/${number}`]: ResponseQuiz
  [key: `quizzes/user-quizzes/${number}`]: ResponseQuiz
  [key: `quizzes/${number}/answers?guestId=${string}`]: Result
}
