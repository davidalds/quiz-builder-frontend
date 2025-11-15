import * as z from 'zod'

export const quizSchema = z.object({
  title: z
    .string()
    .min(5, { error: 'Título do quiz deve ter no mínimo 5 caracteres' })
    .trim(),
  description: z
    .string()
    .min(10, { error: 'Descrição deve conter no mínimo 10 caracteres' })
    .trim(),
  questions: z
    .array(
      z.object({
        text: z
          .string()
          .min(5, {
            error: 'Título da pergunta deve ter no mínimo 5 caracteres',
          })
          .trim(),
        answers: z
          .array(
            z.object({
              text: z
                .string()
                .min(1, 'Título da opção deve ter no mínimo 1 caractere')
                .trim(),
              isCorrect: z.literal(['false', 'true']),
            }),
          )
          .nonempty('A questão deve ter pelo menos uma opção de resposta'),
      }),
    )
    .nonempty('O quiz deve ter pelo menos uma questão'),
})

export type quizFormType = z.infer<typeof quizSchema>
