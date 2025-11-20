import * as z from 'zod'

export const loginSchema = z.object({
  email: z.email({ message: 'Valor deve ser um e-mail válido' }).trim(),
  password: z.string().min(1, 'Senha é Obrigatória').trim(),
})

export type loginType = z.infer<typeof loginSchema>
