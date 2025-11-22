import { createBrowserRouter } from 'react-router'
import PublicHome from './pages/public/home'
import PublicLayout from './pages/public/layout'
import QuizPage from './pages/public/quiz'
import DashboardLayout from './pages/dashboard/layout'
import DashboardHome from './pages/dashboard/home'
import QuizPageDashboard from './pages/dashboard/quiz'
import ErrorBoundaryFallback from './components/ui/errorBoundaryFallback'
import LoginPage from './pages/auth/login'
import RequireAuth from './auth/requireAuth'
import RegisterPage from './pages/auth/register'

const router = createBrowserRouter([
  {
    path: 'login',
    Component: LoginPage,
  },
  {
    path: 'register',
    Component: RegisterPage,
  },
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
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
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
