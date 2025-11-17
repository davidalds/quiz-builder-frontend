export type quiz = {
  id: number
  title: string
  description: string
}

export type responseQuizzes = {
  total: number
  data: quiz[]
  nextCursor: number | undefined
}

export type responseYourQuizzes = {
  total: number
  data: quiz[]
}

export type quizSubmitType = {
  title: string
  description: string
  questions: {
    text: string
    answers: {
      text: string
      isCorrect: boolean
    }[]
  }[]
}

export type quizSubmitEditType = {
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

// ##################################################

export type responseNewestsQuizzes = {
  total: number
  quizzes: {
    id: number
    title: string
    description?: string
  }[]
}

export type questionOption = {
  id: number
  title: string
}

export type questionAnswerForm = {
  id: number
  text: string
}

export type questionTypeForm = {
  id: number
  text: string
  checkedAnswerId: null | string
  answers: questionAnswerForm[]
}

export type answerType = {
  id: number
  text: string
  isCorrect?: boolean
}

export type questionType = {
  id: number
  text: string
  answers: answerType[]
}

export type quizLabelType = {
  id: number
  title: string
  description?: string
  created_by: string
}

export type responseQuiz = {
  id: number
  title: string
  description: string
  created_by: string
  questions: questionType[]
}

export type optionsForm = {
  title: string
  isAnswer: 'true' | 'false'
}

export type questionForm = {
  title: string
  options: optionsForm[]
}

export type quizForm = {
  title: string
  description?: string
  questions: questionForm[]
}

export type sendAnswerType = {
  questionId: number
  answerId: number
}

export type resultType = {
  id: number
  userId: number
  quizId: number
  score: number
}
