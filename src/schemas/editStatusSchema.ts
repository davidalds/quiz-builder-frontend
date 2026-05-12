import * as z from 'zod'

export const editStatusSchema = z.object({
  status: z.enum(['PUBLICO', 'PRIVADO', 'NAO_LISTADO']),
})

export type editStatusFormType = z.infer<typeof editStatusSchema>
