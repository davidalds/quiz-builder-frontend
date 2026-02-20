import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface InfoQuizProps {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
  result: number
}

function InfoQuiz({
  id,
  title,
  description,
  createdAt,
  updatedAt,
  result,
}: InfoQuizProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Informação do Quiz</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-2">
        <FieldGroup className="grid grid-cols-2 gap-2">
          <Field>
            <FieldLabel>Id</FieldLabel>
            <Input readOnly value={id} />
          </Field>
          <Field>
            <FieldLabel>Título da Questão</FieldLabel>
            <Input readOnly value={title} />
          </Field>
        </FieldGroup>
        <FieldGroup className="grid grid-cols-1 gap-2">
          <Field>
            <FieldLabel>Título da Questão</FieldLabel>
            <Textarea readOnly value={description} />
          </Field>
        </FieldGroup>
        <FieldGroup className="grid grid-cols-1 gap-2">
          <Field>
            <FieldLabel>Total de Respostas Obtidas</FieldLabel>
            <Input readOnly value={result} />
          </Field>
        </FieldGroup>
        <FieldGroup className="grid grid-cols-2 gap-2">
          <Field>
            <FieldLabel>Data de Criação</FieldLabel>
            <Input readOnly value={new Date(createdAt).toLocaleString()} />
          </Field>
          <Field>
            <FieldLabel>Data de Alteração</FieldLabel>
            <Input readOnly value={new Date(updatedAt).toLocaleString()} />
          </Field>
        </FieldGroup>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'secondary'}>Fechar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  )
}

export default InfoQuiz
