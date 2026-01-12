import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormField } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useQuizByUser } from '@/hooks/quizzServiceHooks'
import { editQuizSchema, type editQuizFormType } from '@/schemas/editQuizSchema'
import type { QuestionValuesEdit, QuizSubmit } from '@/types/quizzes'
import { formattedDataQuiz } from '@/utils/formattedDataQuiz'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon, Trash } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import AppendPlusButton from '../components/ui/appendPlusButton'
import type { Entry } from '@/types'
import FormInput from '../components/ui/formInput'
import FormSelect from '../components/ui/formSelect'
import { Spinner } from '@/components/ui/spinner'

interface IProps {
  quizId: string
  submitQuiz: (quizId: number, data: QuizSubmit) => Promise<void>
}

const defaultQuestionValues: QuestionValuesEdit = {
  id: 0,
  text: '',
  answers: [
    { id: 0, text: '', isCorrect: 'false' },
    { id: 0, text: '', isCorrect: 'false' },
    { id: 0, text: '', isCorrect: 'false' },
    { id: 0, text: '', isCorrect: 'false' },
    { id: 0, text: '', isCorrect: 'false' },
  ],
}

function EditQuiz({ quizId, submitQuiz }: IProps) {
  const { data, isLoading } = useQuizByUser(quizId)

  const form = useForm<editQuizFormType>({
    resolver: zodResolver(editQuizSchema),
  })

  const fieldErrors = form.formState.errors

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const closeBtn = useRef<HTMLButtonElement>(null)
  const submitBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (data && form.getValues('questions').length === 0) {
      const { title, description, questions } = data

      const obj = {
        title,
        description,
        questions,
      }

      const arr = Object.entries(obj) as Array<Entry<typeof obj>>

      arr.map(([key, value]) => {
        if (key === 'questions') {
          value.map(({ id: qId, text: qText, answers }) =>
            append({
              id: qId,
              text: qText,
              answers: answers.map(({ id, text, isCorrect }) => ({
                id,
                text,
                isCorrect: String(isCorrect) as 'false' | 'true',
              })),
            }),
          )
        } else {
          form.setValue(key, value)
        }
      })
    }
  }, [data, form, append])

  const verifyIfOnlyOneAnswerIsTrue = (
    arr: editQuizFormType['questions'][number]['answers'],
  ) => {
    return arr.filter((b) => b.isCorrect === 'true').length === 1
  }

  const verifyQuestionsOptions = (questions: editQuizFormType['questions']) => {
    return questions
      .map(({ answers }) => verifyIfOnlyOneAnswerIsTrue(answers))
      .some((v) => v === false)
  }

  const onSubmit = (data: editQuizFormType) => {
    if (verifyQuestionsOptions(data.questions)) {
      toast.error('Cada questão deve conter apenas UMA resposta correta!')
      return
    }
    setIsSubmitting(true)

    submitQuiz(+quizId, formattedDataQuiz(data))
      .then(() => {
        if (closeBtn) {
          closeBtn.current?.click()
          setIsSubmitting(false)
        }
      })
      .catch(() => setIsSubmitting(false))
  }

  useEffect(() => {
    if (fieldErrors.questions) {
      toast.error(fieldErrors.questions.root?.message)
    }
  }, [fieldErrors])

  return (
    <>
      <DialogHeader>
        <DialogTitle>Editar Quiz</DialogTitle>
      </DialogHeader>
      <ScrollArea className="mt-3 max-h-100">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Spinner className="size-8" />
          </div>
        ) : (
          <div className="p-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <FormField
                  control={form.control}
                  defaultValue=""
                  name={'title'}
                  render={({ field }) => (
                    <FormInput<editQuizFormType>
                      inputLabel={'Título do Quiz'}
                      inputPlaceholder={'Ex: Quiz de Geografia'}
                      fieldError={fieldErrors.title}
                      field={field}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  defaultValue=""
                  name="description"
                  render={({ field }) => (
                    <FormInput<editQuizFormType>
                      inputType={'textarea'}
                      inputLabel={'Descrição do Quiz'}
                      inputPlaceholder={
                        'Ex: Quiz de geografia sobre as capitais...'
                      }
                      fieldError={fieldErrors.description}
                      field={field}
                    />
                  )}
                />
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-md font-medium">
                    Cadastro de questões
                  </span>
                  <div>
                    <Button
                      type="button"
                      size={'sm'}
                      variant={'outline'}
                      onClick={() => append(defaultQuestionValues)}
                    >
                      <PlusIcon />
                      Adicionar
                    </Button>
                  </div>
                </div>
                {fields.map(({ answers }, index) => (
                  <div className="flex flex-col gap-3 mt-2" key={index}>
                    <div className="flex justify-between">
                      <Badge>Questão {index + 1}</Badge>
                      <Button
                        size={'icon'}
                        variant={'destructive'}
                        onClick={() => remove(index)}
                      >
                        <Trash />
                      </Button>
                    </div>
                    <FormField
                      key={index}
                      control={form.control}
                      name={`questions.${index}.text`}
                      render={({ field }) => (
                        <FormInput<editQuizFormType>
                          inputLabel={'Pergunta da Questão'}
                          fieldError={
                            fieldErrors.questions?.length
                              ? fieldErrors.questions[index]?.text
                              : undefined
                          }
                          field={field}
                        />
                      )}
                    />
                    {answers.map((_, index2) => (
                      <>
                        <Badge variant={'secondary'}>Opção {index2 + 1}</Badge>
                        <div className={`flex flex-col gap-2`} key={index2}>
                          <FormField
                            control={form.control}
                            name={`questions.${index}.answers.${index2}.text`}
                            render={({ field }) => (
                              <FormInput<editQuizFormType>
                                inputLabel={'Título da Opção'}
                                fieldError={
                                  fieldErrors.questions?.length
                                    ? fieldErrors.questions[index]?.answers
                                        ?.length
                                      ? fieldErrors.questions[index].answers[
                                          index2
                                        ]?.text
                                      : undefined
                                    : undefined
                                }
                                field={field}
                              />
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`questions.${index}.answers.${index2}.isCorrect`}
                            render={({ field }) => (
                              <FormSelect<editQuizFormType>
                                selectLabel={'Tipo da Opção'}
                                selectPlaceholder={'Marque a opção'}
                                field={field}
                                selectItems={[
                                  { value: 'false', label: 'Errada' },
                                  { value: 'true', label: 'Certa' },
                                ]}
                              />
                            )}
                          />
                        </div>
                      </>
                    ))}
                  </div>
                ))}
                {fields.length ? (
                  <AppendPlusButton
                    action={() => append(defaultQuestionValues)}
                  />
                ) : (
                  <></>
                )}
                <button type="submit" hidden ref={submitBtn}></button>
              </form>
            </Form>
          </div>
        )}
      </ScrollArea>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'secondary'} ref={closeBtn}>
            Cancelar
          </Button>
        </DialogClose>
        <Button
          disabled={isSubmitting}
          onClick={() => {
            if (submitBtn.current) {
              submitBtn.current.click()
            }
          }}
        >
          {isSubmitting ? <Spinner /> : 'Confirmar'}
        </Button>
      </DialogFooter>
    </>
  )
}

export default EditQuiz
