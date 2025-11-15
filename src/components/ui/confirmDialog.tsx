import { useRef } from 'react'
import { Button } from './button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog'

interface IProps {
  title: string
  confirmCallback: () => void
}

export default function ConfirmDialog({ title, confirmCallback }: IProps) {
  const btnCloseRef = useRef<HTMLButtonElement>(null)

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'secondary'} ref={btnCloseRef}>
            Cancelar
          </Button>
        </DialogClose>
        <Button
          onClick={() => {
            if (btnCloseRef.current) {
              btnCloseRef.current.click()
            }
            confirmCallback()
          }}
        >
          Confirmar
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
