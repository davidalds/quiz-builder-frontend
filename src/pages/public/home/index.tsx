import CardsHome from '../components/ui/cardsHome'
import { useInfinityQuizzes } from '@/hooks/quizzServiceHooks'
import AlertComponent from '@/components/ui/alertComponent'
import LoadingComponent from '@/components/ui/loadingComponent'
import Section from '@/components/ui/section'
import { ListPlus, ArrowUpNarrowWide } from 'lucide-react'

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
      <div className="flex flex-col gap-2 items-center justify-center min-h-100 text-center text-3xl text-primary font-bold">
        <span>Crie Para Qualquer Um</span>
        <span>Responda Para Qualquer Um</span>
      </div>
      <Section title="Quizzes Criados Recentemente" icon={ListPlus}>
        {isLoading ? (
          <div className="flex justify-center content-center">
            <LoadingComponent />
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
