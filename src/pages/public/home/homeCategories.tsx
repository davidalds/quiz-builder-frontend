import { useInfinityCategoriesQuizzes } from '@/hooks/quizzServiceHooks'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import HomeIntro from '../components/ui/homeIntro'
import Search from '@/components/ui/search'
import AlertComponent from '@/components/ui/alertComponent'
import CardsHome from '../components/ui/cardsHome'
import { Spinner } from '@/components/ui/spinner'

function HomeCategories() {
  const { slug } = useParams()
  const [search, setSearch] = useState<string>('')
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isRefetching,
  } = useInfinityCategoriesQuizzes(search, slug)
  const queryClient = useQueryClient()

  const resetSearch = () => {
    setSearch('')
  }

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['quizzes', 'categories'] })
  }, [search, queryClient, slug])

  return (
    <>
      <HomeIntro>
        <span>Lista de Quizzes</span>
        <span>Categoria: {slug}</span>
      </HomeIntro>
      <div className="mb-4">
        <Search
          isSearching={isRefetching}
          submitSearch={setSearch}
          resetSearch={resetSearch}
          placeholder={'Título do Quiz ou Nome do Usuário'}
        />
      </div>
      {isLoading || isRefetching ? (
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
        <AlertComponent title="Nenhum quiz encontrado!" alertType={'info'}>
          Não foi possível encontrar nenhum quiz.
        </AlertComponent>
      )}
    </>
  )
}

export default HomeCategories
