import { isAxiosError } from 'axios'

export const apiErrorsHandle = (err: unknown): string => {
  if (isAxiosError(err)) {
    const resp = err.response
    if (resp) {
      const data: { message: string; error: string; statusCode: number } =
        resp.data
      return data.message
    }
    return err.message
  }
  return 'Ocorreu um erro inesperado!'
}
