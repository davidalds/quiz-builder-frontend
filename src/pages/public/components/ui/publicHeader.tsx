import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { useTheme } from '@/theme/useTheme'
import { LogIn, Moon, Sun, User } from 'lucide-react'
import LogoLink from './logoLink'
import MenuMobile from './menuMobile'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Link } from 'react-router'
import { useCategory } from '@/hooks/categoryServiceHooks'
import { useAuth } from '@/auth/useAuth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function PublicHeader() {
  const theme = useTheme()
  const isMobile = useIsMobile()
  const { data } = useCategory()
  const auth = useAuth()

  return (
    <header className="flex justify-between p-2 bg-primary text-primary-foreground">
      {!isMobile && <LogoLink />}
      <NavigationMenu>
        {isMobile ? (
          <MenuMobile />
        ) : (
          <>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-primary font-normal text-md">
                  Categorias
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {data?.map(({ title, slug }) => (
                    <NavigationMenuLink key={slug} asChild>
                      <Link to={`/${slug}`}>{title}</Link>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to={'/dashboard'}>Criar Quiz</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </>
        )}
      </NavigationMenu>
      <div className="flex align-items">
        {!auth.isAuthenticated() ? (
          <Button variant={'secondary'} asChild>
            <Link to={'/login'}>
              <LogIn />
              Entrar
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'secondary'}>
                <User />
                {auth.user.nome}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link to={'/profile'}>Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={'/dashboard'}>Dashboard</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={auth.signOut}>Sair</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Button
          variant={'secondary'}
          className="ml-3"
          onClick={() =>
            theme.changeTheme(theme.color === 'light' ? 'dark' : 'light')
          }
        >
          {theme.color === 'light' ? <Moon /> : <Sun />}
        </Button>
      </div>
    </header>
  )
}

export default PublicHeader
