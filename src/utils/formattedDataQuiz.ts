import type { quizFormType } from '@/schemas/createQuizSchema'
import type { editQuizFormType } from '@/schemas/editQuizSchema'
import type { QuizSubmit } from '@/types/quizzes'

export const formattedDataQuiz = (
  data: quizFormType | editQuizFormType,
): QuizSubmit => {
  return {
    ...data,
    questions: data.questions.map((q) => ({
      ...q,
      answers: q.answers.map((a) => ({
        ...a,
        isCorrect: a.isCorrect === 'false' ? false : true,
      })),
    })),
  }
}
