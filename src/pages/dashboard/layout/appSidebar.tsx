import { useAuth } from '@/auth/useAuth'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { QuizBuilderLogo } from '@/icons/quizBuilderLogo'
import {
  FileQuestionMark,
  House,
  LogOut,
  User,
  type LucideIcon,
} from 'lucide-react'
import { Link, useLocation } from 'react-router'

type appLinksType = {
  linkName: string
  url: string
  icon: LucideIcon
  locationName: string
}

const appLinks: appLinksType[] = [
  {
    linkName: 'Home',
    url: '/dashboard',
    icon: House,
    locationName: 'dashboard',
  },
  {
    linkName: 'Quizzes',
    url: 'quizzes',
    icon: FileQuestionMark,
    locationName: 'quizzes',
  },
]

function AppSidebar() {
  const auth = useAuth()
  const { pathname } = useLocation()

  const isActiveLink = (locationName: string) => {
    const pageLocation = pathname.split('/')
    return pageLocation[pageLocation.length - 1] === locationName
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild variant={'content'} size={'lg'}>
              <Link to={'/dashboard'}>
                <div className="flex justify-center items-center rounded-lg">
                  <QuizBuilderLogo size={28} />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <span className="font-bold">Quiz Builder</span>
                  <span className="text-xs">Área de Criação</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {appLinks.map(
                ({ linkName, url, icon: Icon, locationName }, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      tooltip={linkName}
                      isActive={isActiveLink(locationName)}
                      asChild
                    >
                      <Link to={url}>
                        <Icon />
                        <span>{linkName}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton variant={'content'}>
            <User />
            <span className="text-md font-medium">{auth.user.name}</span>
          </SidebarMenuButton>
          <SidebarMenuButton onClick={() => auth.signOut()}>
            <LogOut />
            <span className="text-md font-medium">Sair</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
