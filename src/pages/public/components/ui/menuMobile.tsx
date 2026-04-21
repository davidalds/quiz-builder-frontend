import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import LogoLink from './logoLink'
import { Link } from 'react-router'
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

function MenuMobile() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <LogoLink />
        </SheetHeader>
        <NavigationMenuList variant="mobile">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to={'dashboard'}>Criar Quiz</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </SheetContent>
    </Sheet>
  )
}

export default MenuMobile
