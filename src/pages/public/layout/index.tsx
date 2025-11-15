import { Outlet } from 'react-router'
import PublicHeader from '../components/ui/publicHeader'
import PublicFooter from '../components/ui/publicFooter'

function PublicLayout() {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen p-2 flex flex-col">
        <Outlet />
      </main>
      <PublicFooter />
    </>
  )
}

export default PublicLayout
