import CardsHome from '../components/ui/cardsHome'
import { useInfinityQuizzes } from '@/hooks/quizzServiceHooks'
import AlertComponent from '@/components/ui/alertComponent'
import Section from '@/components/ui/section'
import { ListPlus, ArrowUpNarrowWide } from 'lucide-react'
import Intro from '../components/ui/intro'
import { Spinner } from '@/components/ui/spinner'

function PublicHome() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfinityQuizzes()

  return (
    <>
      <Intro />
      <Section title="Quizzes Criados Recentemente" icon={ListPlus}>
        {isLoading ? (
          <div className="flex justify-center content-center">
            <Spinner className="size-8" />
          </div>
        ) : isError ? (
          <AlertComponent
            title="Não foi possível carregar quizzes!"
            alertType={'error'}
          >
            Ocorreu um erro ao carregar os quizzes!
          </AlertComponent>
        ) : data?.pages[0].total ? (
          <CardsHome
            data={data}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        ) : (
          <AlertComponent title="Nenhum quizz encontrado!" alertType={'info'}>
            Não foi possível encontrar nenhum quiz.
          </AlertComponent>
        )}
      </Section>
      <Section title="Quizzes Mais Acessados" icon={ArrowUpNarrowWide}>
        <AlertComponent title="Em breve!" alertType={'info'}>
          Em breve!
        </AlertComponent>
      </Section>
    </>
  )
}

export default PublicHome
