import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { quizSchema, type quizFormType } from '@/schemas/createQuizSchema'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { PlusIcon, Trash } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DialogClose } from '@radix-ui/react-dialog'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import type { QuestionValues, QuizSubmit } from '@/types/quizzes'
import { formattedDataQuiz } from '@/utils/formattedDataQuiz'
import AppendPlusButton from '../components/ui/appendPlusButton'
import FormInput from '../components/ui/formInput'
import FormSelect from '../components/ui/formSelect'
import { Spinner } from '@/components/ui/spinner'
import React from 'react'

interface IProps {
  submitQuiz: (data: QuizSubmit) => Promise<void>
}

const defaultQuestionValues: QuestionValues = {
  text: '',
  answers: [
    { text: '', isCorrect: 'false' },
    { text: '', isCorrect: 'false' },
    { text: '', isCorrect: 'false' },
    { text: '', isCorrect: 'false' },
    { text: '', isCorrect: 'false' },
  ],
}

function CreateQuiz({ submitQuiz }: IProps) {
  const form = useForm<quizFormType>({
    resolver: zodResolver(quizSchema),
  })
  const fieldErrors = form.formState.errors

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const closeBtn = useRef<HTMLButtonElement>(null)
  const submitBtn = useRef<HTMLButtonElement>(null)

  const verifyIfOnlyOneAnswerIsTrue = (
    arr: quizFormType['questions'][number]['answers'],
  ) => {
    return arr.filter((b) => b.isCorrect === 'true').length === 1
  }

  const verifyQuestionsOptions = (questions: quizFormType['questions']) => {
    return questions
      .map(({ answers }) => verifyIfOnlyOneAnswerIsTrue(answers))
      .some((v) => v === false)
  }

  const onSubmit = (data: quizFormType) => {
    if (data) {
      if (verifyQuestionsOptions(data.questions)) {
        toast.error('Cada questão deve conter apenas UMA resposta correta!')
        return
      }
      setIsSubmitting(true)

      submitQuiz(formattedDataQuiz(data))
        .then(() => {
          if (closeBtn) {
            closeBtn.current?.click()
            setIsSubmitting(false)
          }
          form.reset()
          remove()
        })
        .catch(() => {
          setIsSubmitting(false)
        })
    }
  }

  useEffect(() => {
    if (fieldErrors.questions) {
      toast.error(fieldErrors.questions.message)
    }
  }, [fieldErrors])

  return (
    <>
      <DialogHeader>
        <DialogTitle>Novo Quiz</DialogTitle>
      </DialogHeader>
      <ScrollArea className="mt-3 max-h-100">
        <div className="px-3">
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
                  <FormInput<quizFormType>
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
                  <FormInput<quizFormType>
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
              {fields.map((_, index) => (
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
                      <FormInput<quizFormType>
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
                  {Array.from({ length: 5 }).map((_, index2) => (
                    <React.Fragment key={index2}>
                      <Badge variant={'secondary'}>Opção {index2 + 1}</Badge>
                      <div className={`flex flex-col gap-2`} key={index2}>
                        <FormField
                          control={form.control}
                          name={`questions.${index}.answers.${index2}.text`}
                          render={({ field }) => (
                            <FormInput<quizFormType>
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
                            <FormSelect<quizFormType>
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
                    </React.Fragment>
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

export default CreateQuiz
