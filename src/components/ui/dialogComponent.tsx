import type { LucideIcon } from 'lucide-react'
import { Button } from './button'
import { Dialog, DialogContent, DialogTrigger } from './dialog'
import type { ReactNode } from 'react'

interface IProps {
  btnTriggerIcon?: LucideIcon
  btnTriggerText: string
  btnVariant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
  children: ReactNode
}

function DialogComponent({
  btnTriggerIcon: BtnTriggerIcon,
  btnTriggerText,
  btnVariant = 'default',
  children,
}: IProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={btnVariant}>
          {BtnTriggerIcon ? <BtnTriggerIcon /> : ''}
          {btnTriggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default DialogComponent
