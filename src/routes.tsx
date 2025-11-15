import { createBrowserRouter } from 'react-router'
import PublicHome from './pages/public/home'
import PublicLayout from './pages/public/layout'
import QuizPage from './pages/public/quiz'
import DashboardLayout from './pages/dashboard/layout'
import DashboardHome from './pages/dashboard/home'
import QuizPageDashboard from './pages/dashboard/quiz'
import ErrorBoundaryFallback from './components/ui/errorBoundaryFallback'

const router = createBrowserRouter([
  {
    path: '/',
    Component: PublicLayout,
    children: [
      {
        index: true,
        Component: PublicHome,
        errorElement: <ErrorBoundaryFallback />,
      },
      {
        path: 'quiz/:id',
        Component: QuizPage,
        errorElement: <ErrorBoundaryFallback />,
      },
    ],
  },
  {
    path: 'dashboard',
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardHome,
        errorElement: <ErrorBoundaryFallback />,
      },
      {
        path: 'quizzes',
        Component: QuizPageDashboard,
        errorElement: <ErrorBoundaryFallback />,
      },
    ],
  },
])

export default router
