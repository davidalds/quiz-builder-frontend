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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useCategory } from '@/hooks/categoryServiceHooks'
import { ScrollArea } from '@/components/ui/scroll-area'

function MenuMobile() {
  const { data } = useCategory()
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
          <Accordion type="single" collapsible>
            <AccordionItem value="categories">
              <AccordionTrigger className="py-2 cursor-pointer px-2 font-normal text-md hover:bg-accent">
                Categorias
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="h-40">
                  <div className="flex flex-col pl-1 py-2">
                    {data?.map(({ title, slug }) => (
                      <Link
                        key={slug}
                        to={`/${slug}`}
                        className="hover:bg-accent py-2 pl-2 cursor-pointer"
                      >
                        {title}
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </NavigationMenuList>
      </SheetContent>
    </Sheet>
  )
}

export default MenuMobile
