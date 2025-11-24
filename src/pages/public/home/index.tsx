import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CardsHome from '../components/ui/cardsHome'
import { useInfinityQuizzes } from '@/hooks/quizzServiceHooks'
import AlertComponent from '@/components/ui/alertComponent'
import LoadingComponent from '@/components/ui/loadingComponent'

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
      <Tabs defaultValue="newests" className="grow content-between">
        <TabsList>
          <TabsTrigger value="newests">Mais Recentes</TabsTrigger>
          <TabsTrigger value="hot">Mais Acessados</TabsTrigger>
        </TabsList>
        <TabsContent value="newests">
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
              Não foi possível encontrar nenhum quizz.
            </AlertComponent>
          )}
        </TabsContent>
        <TabsContent value="hot">
          {isError ? (
            <AlertComponent
              title="Não foi possível carregar quizzes!"
              alertType={'error'}
            >
              Ocorreu um erro ao carregar os quizzes!
            </AlertComponent>
          ) : (
            <AlertComponent title="Em breve!" alertType={'info'}>
              Ainda não foi implementado.
            </AlertComponent>
          )}
        </TabsContent>
      </Tabs>
    </>
  )
}

export default PublicHome
