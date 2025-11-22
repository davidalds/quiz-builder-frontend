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
import { api } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import * as z from 'zod'
import AuthContainer from './components/authContainer'
import AuthHeader from './components/authHeader'

const registerSchema = z
  .object({
    email: z.email('Valor deve ser um e-mail').trim(),
    name: z.string().min(1, 'Nome é Obrigatório').trim(),
    password: z.string().min(1, 'Senha é Obrigatória').trim(),
    confirmPassword: z.string().min(1, 'Campo é Obrigatório'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Senhas diferentes',
    path: ['confirmPassword'],
  })

type registerFormType = z.infer<typeof registerSchema>

function RegisterPage() {
  const navigate = useNavigate()
  const form = useForm<registerFormType>({
    resolver: zodResolver(registerSchema),
  })
  const errors = form.formState.errors

  const onSubmit = async ({ email, name, password }: registerFormType) => {
    try {
      await api.post('users', { email, name, password })
      navigate('/login')
      toast.success('Usuário criado com sucesso!')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast('Ocorreu um erro ao cadastrar usuário!')
    }
  }

  return (
    <AuthContainer>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-md shadow-md p-2 rounded-md bg-card"
        >
          <AuthHeader title="Quiz Builder" subtitle="Cadastro" />
          <FormField
            control={form.control}
            name="email"
            defaultValue=""
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
            name="name"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de Usuário</FormLabel>
                <FormControl>
                  <Input placeholder="Insira o nome de usuário" {...field} />
                </FormControl>
                {errors.name ? (
                  <FormMessage>{errors.name.message}</FormMessage>
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
                    {...field}
                    type="password"
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
          <FormField
            control={form.control}
            name="confirmPassword"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Repita a senha"
                    {...field}
                    type="password"
                  />
                </FormControl>
                {errors.confirmPassword ? (
                  <FormMessage>{errors.confirmPassword.message}</FormMessage>
                ) : (
                  ''
                )}
              </FormItem>
            )}
          />
          <Button type="submit">Cadastrar</Button>
          <Button variant={'secondary'} asChild>
            <Link to={'/login'}>Ir para Login</Link>
          </Button>
        </form>
      </Form>
    </AuthContainer>
  )
}

export default RegisterPage
