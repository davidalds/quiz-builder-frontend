import type { ReactNode } from 'react'
import { Alert, AlertDescription, AlertTitle } from './alert'
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  CircleX,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react'

type alertType = 'error' | 'info' | 'success' | 'warning'
type alertVariants = 'default' | 'success' | 'destructive' | 'warning'

interface IProps {
  alertType?: alertType
  title: string
  children: ReactNode | ReactNode[]
}

function AlertComponent({ alertType = 'info', title, children }: IProps) {
  const handleAlertType = () => {
    const obj: Record<alertType, { icon: LucideIcon; variant: alertVariants }> =
      {
        info: {
          icon: AlertCircleIcon,
          variant: 'default',
        },
        success: {
          icon: CheckCircle2Icon,
          variant: 'success',
        },
        error: {
          icon: CircleX,
          variant: 'destructive',
        },
        warning: {
          icon: TriangleAlert,
          variant: 'warning',
        },
      }
    return obj[alertType]
  }

  const { icon: Icon } = handleAlertType()

  return (
    <Alert variant={handleAlertType().variant} className="items-center">
      <Icon />
      <AlertTitle className="text-lg">{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}

export default AlertComponent
