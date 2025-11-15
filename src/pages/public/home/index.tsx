import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CardsHome from '../components/ui/cardsHome'
import { useInfinityQuizzes } from '@/hooks/quizzServiceHooks'
import AlertComponent from '@/components/ui/alertComponent'

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
          {isError ? (
            <AlertComponent
              title="Não foi possível carregar quizzes!"
              alertType={'error'}
            >
              Ocorreu um erro ao carregar os quizzes!
            </AlertComponent>
          ) : (
            <CardsHome
              data={data}
              isLoading={isLoading}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
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
