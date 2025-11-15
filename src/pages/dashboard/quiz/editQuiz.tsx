import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

function EditQuiz() {
  return (
    <DialogContent>
      <DialogHeader>Editar Quiz</DialogHeader>
      <ScrollArea className="mt-3 max-h-100">
        <div className="px-3"></div>
      </ScrollArea>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'secondary'}>Cancelar</Button>
        </DialogClose>
        <Button>Confirmar</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default EditQuiz
