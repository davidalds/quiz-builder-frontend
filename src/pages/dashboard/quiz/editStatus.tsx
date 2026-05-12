import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormField } from '@/components/ui/form'
import {
  editStatusSchema,
  type editStatusFormType,
} from '@/schemas/editStatusSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import FormSelect from '../components/ui/formSelect'
import { useRef, useState } from 'react'
import FetchingButton from '@/components/ui/fetchingButton'
import type { QuizStatus } from '@/types/quizzes'

interface EditStatusProps {
  quizId: number
  status: QuizStatus
  submitQuiz: (quizId: number, data: editStatusFormType) => Promise<void>
}

function EditStatus({ status, quizId, submitQuiz }: EditStatusProps) {
  const form = useForm<editStatusFormType>({
    resolver: zodResolver(editStatusSchema),
  })
  const submitBtn = useRef<HTMLButtonElement>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const closeBtn = useRef<HTMLButtonElement>(null)

  const submit = async (data: editStatusFormType) => {
    setIsSubmitting(true)

    submitQuiz(quizId, data)
      .then(() => {
        if (closeBtn) {
          closeBtn.current?.click()
          setIsSubmitting(false)
        }
      })
      .catch(() => setIsSubmitting(false))
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Modificar Status</DialogTitle>
      </DialogHeader>
      <div className="pt-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <FormField
              control={form.control}
              name={'status'}
              defaultValue={status}
              render={({ field }) => (
                <FormSelect<editStatusFormType>
                  selectLabel={'Status'}
                  field={field}
                  selectItems={[
                    {
                      value: 'PUBLICO',
                      label: 'Público',
                    },
                    {
                      value: 'PRIVADO',
                      label: 'Privado',
                    },
                    {
                      value: 'NAO_LISTADO',
                      label: 'Não Listado',
                    },
                  ]}
                />
              )}
            />
            <button type="submit" hidden ref={submitBtn}></button>
          </form>
        </Form>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'secondary'} ref={closeBtn}>
            Cancelar
          </Button>
        </DialogClose>
        <FetchingButton
          isFetching={isSubmitting}
          fetchingFunc={() => {
            if (submitBtn.current) {
              submitBtn.current.click()
            }
          }}
          buttonContent="Confirmar"
        />
      </DialogFooter>
    </>
  )
}

export default EditStatus
