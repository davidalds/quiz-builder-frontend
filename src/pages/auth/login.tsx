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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import AuthContainer from './components/authContainer'
import AuthHeader from './components/authHeader'

export default function LoginPage() {
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  })
  const errors = form.formState.errors
  const auth = useAuth()

  const onSubmit = async (data: loginType) => {
    try {
      await auth.signIn(data)
      toast.success('Login efetuado com sucesso!')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('E-mail ou senha incorretos!')
    }
  }

  return (
    <AuthContainer>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-md shadow-md p-2 rounded-md bg-card"
        >
          <AuthHeader title="Quiz Builder" subtitle="Login" />
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
          <Button variant={'secondary'} asChild>
            <Link to={'/register'}>Criar Conta</Link>
          </Button>
        </form>
      </Form>
    </AuthContainer>
  )
}
