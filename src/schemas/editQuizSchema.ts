import * as z from 'zod'

export const editQuizSchema = z.object({
  title: z
    .string()
    .min(5, {
      error: 'Título do quiz deve ter no mínimo 5 caracteres',
    })
    .trim(),
  description: z
    .string()
    .min(5, {
      error: 'Descrição do quiz deve ter no mínimo 5 caracteres',
    })
    .trim(),
  questions: z
    .array(
      z.object({
        id: z.number(),
        text: z
          .string()
          .min(5, { error: 'Texto da questão deve ter no mínimo 5 caracteres' })
          .trim(),
        answers: z
          .array(
            z.object({
              id: z.number(),
              text: z
                .string()
                .min(1, {
                  error: 'Texto da resposta deve ter no mínimo 1 caractere',
                })
                .trim(),
              isCorrect: z.enum(['false', 'true']),
            }),
          )
          .nonempty('A questão deve ter pelo menos uma opção de resposta'),
      }),
    )
    .nonempty('O quiz deve ter pelo menos uma questão'),
})

export type editQuizFormType = z.infer<typeof editQuizSchema>
