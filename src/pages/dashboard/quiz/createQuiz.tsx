import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { quizSchema, type quizFormType } from '@/schemas/createQuizSchema'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { PlusIcon, Trash } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DialogClose } from '@radix-ui/react-dialog'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import type { quizSubmitType } from '@/types/quizzes'
import { formattedDataQuiz } from '@/utils/formattedDataQuiz'
import LoadingComponent from '@/components/ui/loadingComponent'

interface IProps {
  submitQuiz: (data: quizSubmitType) => Promise<void>
}

const defaultQuestionValues: {
  text: string
  answers: {
    text: ''
    isCorrect: 'false' | 'true'
  }[]
} = {
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
                  <FormItem>
                    <FormLabel>Título do Quiz</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Quiz de Geografia" {...field} />
                    </FormControl>
                    {fieldErrors.title ? (
                      <FormMessage>{fieldErrors.title.message}</FormMessage>
                    ) : (
                      <></>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                defaultValue=""
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição do Quiz</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Quiz de geografia sobre as capitais..."
                        {...field}
                      />
                    </FormControl>
                    {fieldErrors.description ? (
                      <FormMessage>
                        {fieldErrors.description.message}
                      </FormMessage>
                    ) : (
                      <></>
                    )}
                  </FormItem>
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
                      <FormItem>
                        <FormLabel>Pergunta da Questão</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        {fieldErrors.questions?.length ? (
                          <FormMessage>
                            {fieldErrors.questions[index]?.text?.message}
                          </FormMessage>
                        ) : (
                          <></>
                        )}
                      </FormItem>
                    )}
                  />
                  {Array.from({ length: 5 }).map((_, index2) => (
                    <div className="flex gap-2" key={index2}>
                      <FormField
                        control={form.control}
                        name={`questions.${index}.answers.${index2}.text`}
                        render={({ field }) => (
                          <FormItem className="grow">
                            <FormLabel>Título da Opção</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            {fieldErrors.questions?.length ? (
                              fieldErrors.questions[index]?.answers?.length ? (
                                <FormMessage>
                                  {
                                    fieldErrors.questions[index].answers[index2]
                                      ?.text?.message
                                  }
                                </FormMessage>
                              ) : (
                                <></>
                              )
                            ) : (
                              <></>
                            )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`questions.${index}.answers.${index2}.isCorrect`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Opção Correta</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Marque a opção" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="false">Falsa</SelectItem>
                                <SelectItem value="true">Verdadeira</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              ))}
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
          {isSubmitting ? <LoadingComponent /> : 'Confirmar'}
        </Button>
      </DialogFooter>
    </>
  )
}

export default CreateQuiz
