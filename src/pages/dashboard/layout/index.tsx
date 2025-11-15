import { Outlet } from 'react-router'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from './appSidebar'
import Header from './header'

function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-2">
        <Header />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
