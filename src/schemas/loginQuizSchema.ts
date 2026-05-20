import * as z from 'zod'

export const loginSchema = z.object({
  email: z.email({ message: 'E-mail deve ser válido' }).trim(),
  password: z.string().min(1, 'Senha é obrigatória').trim(),
})

export type loginType = z.infer<typeof loginSchema>
