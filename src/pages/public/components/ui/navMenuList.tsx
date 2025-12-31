import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Link } from 'react-router'

interface NavMenuListProps {
  variant?: 'default' | 'mobile'
  navLinks: { link: string; title: string }[]
}

function NavMenuList({ variant = 'default', navLinks }: NavMenuListProps) {
  return (
    <NavigationMenuList variant={variant}>
      {navLinks.map(({ link, title }, index) => (
        <NavigationMenuItem key={index}>
          <NavigationMenuLink asChild>
            <Link to={link}>{title}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  )
}

export default NavMenuList
