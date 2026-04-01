import { useAuth } from '@/auth/useAuth'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/theme/useTheme'
import { House, Moon, Sun } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'

interface IProps {
  children: ReactNode
}

function AuthContainer({ children }: IProps) {
  const auth = useAuth()
  const theme = useTheme()
  const navigate = useNavigate()
  const isAuthenticated = auth.isAuthenticated()
  const [searchParams] = useSearchParams()
  const redirectUrl = searchParams.get('redirect')

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectUrl ?? '/')
    }
  }, [isAuthenticated, navigate, redirectUrl])

  return isAuthenticated ? (
    <></>
  ) : (
    <div className="flex justify-center items-center h-screen bg-background p-2">
      <div className="absolute top-0 left-0 p-2">
        <Button asChild>
          <Link to={'/'}>
            <House />
            Página Inicial
          </Link>
        </Button>
      </div>
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
      {children}
    </div>
  )
}

export default AuthContainer
