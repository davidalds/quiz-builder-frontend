import * as z from 'zod'

export const registerSchema = z
  .object({
    email: z.email('E-mail deve ser válido').trim(),
    name: z
      .string()
      .trim()
      .min(5, 'Mínimo 5 caracteres')
      .max(50, 'Máximo 50 caracteres'),
    password: z.string().trim().min(5, 'Mínimo 5 caracteres'),
    confirmPassword: z.string().min(1, 'Campo é obrigatório'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Senhas diferentes',
    path: ['confirmPassword'],
  })

export type registerFormType = z.infer<typeof registerSchema>
