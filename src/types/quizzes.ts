import type { User } from './user'

export interface Quiz {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
  User: Pick<User, 'name'>
}

export interface Dashboard {
  totalQuizzes: number
  totalAnsweredQuizzes: number
  mostAnsweredQuiz?: Quiz & {
    _count: {
      Result: number
    }
  }
}

export interface ResponseQuizzes {
  total: number
  data: (Quiz & { _count: { Result: number } })[]
}

export interface ResponseInfiniteQuizzes extends ResponseQuizzes {
  nextCursor: number | undefined
}

export interface QuizSubmit {
  title: string
  description: string
  questions: {
    id?: number
    text: string
    answers: {
      id?: number
      text: string
      isCorrect: boolean
    }[]
  }[]
}

export type questionOption = {
  id: number
  title: string
}

interface Answer {
  id: number
  text: string
  isCorrect: boolean
}

export interface Question {
  id: number
  text: string
  answers: Omit<Answer, 'isCorrect'>[]
}

export interface QuestionForm extends Question {
  checkedAnswerId: null | string
}

export interface QuizLabel {
  id: number
  title: string
  description?: string
  User?: User
}

interface QuestionResponse extends Question {
  answers: Answer[]
}

export interface ResponseQuiz {
  id: number
  title: string
  description: string
  User: User
  questions: QuestionResponse[]
}

export type sendAnswerType = {
  questionId: number
  answerId: number
}

export interface Result {
  id: number
  userId: number
  quizId: number
  score: number
  Quiz: {
    questions: Question[]
  }
}

interface AnswerInputValue {
  id: number
  text: ''
  isCorrect: 'false' | 'true'
}

export interface QuestionValues {
  text: string
  answers: Omit<AnswerInputValue, 'id'>[]
}

export interface QuestionValuesEdit {
  id: number
  text: string
  answers: AnswerInputValue[]
}
