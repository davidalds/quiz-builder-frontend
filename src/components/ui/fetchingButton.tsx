import type { VariantProps } from 'class-variance-authority'
import { Button, buttonVariants } from './button'
import { Spinner } from './spinner'
import type { ReactNode } from 'react'

interface FetchingButtonProps {
  isFetching: boolean
  fetchingFunc?: () => void
  buttonContent: ReactNode | ReactNode[]
}

function FetchingButton({
  isFetching,
  fetchingFunc,
  buttonContent,
  variant,
  ...props
}: FetchingButtonProps &
  React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>) {
  return (
    <Button
      variant={variant}
      disabled={isFetching}
      onClick={fetchingFunc}
      {...props}
    >
      {isFetching ? <Spinner /> : buttonContent}
    </Button>
  )
}

export default FetchingButton
