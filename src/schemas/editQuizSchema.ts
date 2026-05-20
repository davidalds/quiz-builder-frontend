import * as z from 'zod'

export const editQuizSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Mínimo 3 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  description: z
    .string()
    .trim()
    .min(10, 'Mínimo 10 caracteres')
    .max(500, 'Máximo 500 caracteres'),
  categories: z
    .array(
      z.object({
        slug: z.string().min(1, 'Quiz deve ter uma categoria'),
      }),
    )
    .nonempty('O quiz deve ter uma ou mais categorias'),
  questions: z
    .array(
      z.object({
        id: z.number(),
        text: z
          .string()
          .trim()
          .min(5, 'Mínimo 5 caracteres')
          .max(300, 'Máximo 300 caracteres'),
        answers: z
          .array(
            z.object({
              id: z.number(),
              text: z
                .string()
                .trim()
                .min(1, 'Mínimo 1 caractere')
                .max(150, 'Máximo 150 caracteres'),
              isCorrect: z.literal(['false', 'true']),
            }),
          )
          .nonempty('A questão deve ter pelo menos uma opção de resposta'),
      }),
    )
    .nonempty('O quiz deve ter pelo menos uma questão'),
})

export type editQuizFormType = z.infer<typeof editQuizSchema>
