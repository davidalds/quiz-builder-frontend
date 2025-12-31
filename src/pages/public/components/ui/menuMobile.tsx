import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import LogoLink from './logoLink'
import NavMenuList from './navMenuList'

function MenuMobile() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <LogoLink />
        </SheetHeader>
        <NavMenuList
          variant={'mobile'}
          navLinks={[
            { link: '/', title: 'Home' },
            { link: '/dashboard', title: 'Criar Quiz' },
          ]}
        />
      </SheetContent>
    </Sheet>
  )
}

export default MenuMobile
