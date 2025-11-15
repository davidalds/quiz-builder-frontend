import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { QuizBuilderLogo } from '@/icons/quizBuilderLogo'
import { useTheme } from '@/theme/useTheme'
import { Moon, Sun } from 'lucide-react'
import { Link } from 'react-router'

function PublicHeader() {
  const theme = useTheme()

  return (
    <header className="flex justify-between p-2 bg-primary text-primary-foreground">
      <Link to={'/'} className="flex items-center gap-1">
        <QuizBuilderLogo />
        <h1 className="text-2xl font-bold">Quiz Builder</h1>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to={'/'}>Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to={'/dashboard'}>Criar Quiz</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <Button
          variant={'secondary'}
          className="ml-3"
          onClick={() =>
            theme.changeTheme(theme.color === 'light' ? 'dark' : 'light')
          }
        >
          {theme.color === 'light' ? <Moon /> : <Sun />}
        </Button>
      </NavigationMenu>
    </header>
  )
}

export default PublicHeader
