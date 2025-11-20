import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'
import router from './routes'
import { useTheme } from './theme/useTheme'
import AuthProvider from './auth/authProvider'

const queryClient = new QueryClient()

function App() {
  const theme = useTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position={'top-center'}
          theme={theme.color}
          closeOnClick={true}
        />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
