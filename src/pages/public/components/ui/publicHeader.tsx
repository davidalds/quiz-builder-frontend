import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { useTheme } from '@/theme/useTheme'
import { Moon, Sun } from 'lucide-react'
import LogoLink from './logoLink'
import MenuMobile from './menuMobile'
import NavMenu from './navMenuList'
import { NavigationMenu } from '@/components/ui/navigation-menu'

function PublicHeader() {
  const theme = useTheme()
  const isMobile = useIsMobile()

  return (
    <header className="flex justify-between p-2 bg-primary text-primary-foreground">
      {!isMobile && <LogoLink />}
      <NavigationMenu>
        {isMobile ? (
          <MenuMobile />
        ) : (
          <>
            <NavMenu
              navLinks={[
                { link: '/', title: 'Home' },
                { link: '/dashboard', title: 'Criar Quiz' },
              ]}
            />
          </>
        )}
      </NavigationMenu>
      <Button
        variant={'secondary'}
        className="ml-3"
        onClick={() =>
          theme.changeTheme(theme.color === 'light' ? 'dark' : 'light')
        }
      >
        {theme.color === 'light' ? <Moon /> : <Sun />}
      </Button>
    </header>
  )
}

export default PublicHeader
