export interface ResultQuizzes {
  total: number
  quizzes: {
    id: number
    publicId: string
    title: string
    done: string
    redone: string
  }[]
}
