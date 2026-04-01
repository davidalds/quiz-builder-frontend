export interface ResultQuizzes {
  total: number
  quizzes: {
    id: number
    title: string
    done: string
    redone: string
  }[]
}
