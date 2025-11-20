import { useAuth } from '@/auth/useAuth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema, type loginType } from '@/schemas/loginQuizSchema'
import { useTheme } from '@/theme/useTheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { Moon, Sun } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Navigate, useLocation } from 'react-router'
import { toast } from 'react-toastify'

export default function Login() {
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  })
  const errors = form.formState.errors
  const auth = useAuth()
  const location = useLocation()
  const theme = useTheme()

  const onSubmit = async (data: loginType) => {
    try {
      await auth.signIn(data)
      toast.success('Login efetuado com sucesso!')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('E-mail ou senha incorretos!')
    }
  }

  return auth.isAuthenticated() ? (
    <Navigate to={'/dashboard'} state={{ from: location }} replace={true} />
  ) : (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="absolute top-0 right-0 p-2">
        <Button
          variant={'secondary'}
          onClick={() =>
            theme.changeTheme(theme.color === 'light' ? 'dark' : 'light')
          }
        >
          {theme.color === 'light' ? <Moon /> : <Sun />}
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-md shadow-md p-2 rounded-md bg-card"
        >
          <div className="flex flex-col gap-1 text-center">
            <h1 className="text-2xl font-bold">Quiz Builder</h1>
            <h2>Login</h2>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o e-mail"
                    type="email"
                    {...field}
                  />
                </FormControl>
                {errors.email ? (
                  <FormMessage>{errors.email.message}</FormMessage>
                ) : (
                  ''
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira a senha"
                    type="password"
                    {...field}
                  />
                </FormControl>
                {errors.password ? (
                  <FormMessage>{errors.password.message}</FormMessage>
                ) : (
                  ''
                )}
              </FormItem>
            )}
          />
          <Button type="submit">Entrar</Button>
        </form>
      </Form>
    </div>
  )
}
