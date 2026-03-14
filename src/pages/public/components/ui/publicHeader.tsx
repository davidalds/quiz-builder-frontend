import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { useTheme } from '@/theme/useTheme'
import { Moon, Sun } from 'lucide-react'
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

function PublicHeader() {
  const theme = useTheme()
  const isMobile = useIsMobile()
  const { data } = useCategory()

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
