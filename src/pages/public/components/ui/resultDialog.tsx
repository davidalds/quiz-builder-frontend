import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import type { resultType } from '@/types/quizzes'

interface IPropsItem {
  index: number
  questionText: string
  answer: {
    id: number
    text: string
  }
}

function Item({ index, questionText, answer }: IPropsItem) {
  return (
    <AccordionItem value={String(answer.id)}>
      <AccordionTrigger>
        <span>{index}</span>
        {questionText}
      </AccordionTrigger>
      <AccordionContent>
        <span className="font-medium mr-1 text-primary">Resposta Correta:</span>
        {answer.text}
      </AccordionContent>
    </AccordionItem>
  )
}

interface IProps {
  score: number
  Quiz: resultType['Quiz']
}

function ResultDialog({ score, Quiz }: IProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Resultado</DialogTitle>
      </DialogHeader>
      <ScrollArea className=" max-h-100 p-3">
        <div className="flex justify-center py-4">
          <h1 className="text-2xl text-primary">
            Você acertou <span className="font-medium">{score}</span> de{' '}
            <span className="font-medium">{Quiz.questions.length}</span>{' '}
            questões!
          </h1>
        </div>
        <Badge variant={'destructive'}>Gabarito</Badge>
        <Separator className="my-2" />
        <Accordion type="multiple">
          {Quiz.questions.map(({ id, text, answers }, index) => (
            <Item
              key={id}
              index={index + 1}
              questionText={text}
              answer={{
                id: answers[0].id,
                text: answers[0].text,
              }}
            />
          ))}
        </Accordion>
      </ScrollArea>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'secondary'}>Fechar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  )
}

export default ResultDialog
