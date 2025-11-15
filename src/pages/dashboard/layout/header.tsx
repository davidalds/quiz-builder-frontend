import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useTheme } from '@/theme/useTheme'
import { Moon, Sun } from 'lucide-react'

function Header() {
  const theme = useTheme()

  return (
    <div className="flex items-center justify-between bg-sidebar-primary rounded-md p-1 text-primary-foreground">
      <SidebarTrigger />

      <Button
        variant={'secondary'}
        onClick={() =>
          theme.changeTheme(theme.color === 'light' ? 'dark' : 'light')
        }
      >
        {theme.color === 'light' ? <Moon /> : <Sun />}
      </Button>
    </div>
  )
}

export default Header
