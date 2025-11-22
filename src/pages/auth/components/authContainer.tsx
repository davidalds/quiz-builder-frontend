import { useAuth } from '@/auth/useAuth'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/theme/useTheme'
import { Moon, Sun } from 'lucide-react'
import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'

interface IProps {
  children: ReactNode
}

function AuthContainer({ children }: IProps) {
  const auth = useAuth()
  const location = useLocation()
  const theme = useTheme()
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
      {children}
    </div>
  )
}

export default AuthContainer
