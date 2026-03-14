import CardsHome from '../components/ui/cardsHome'
import {
  useInfinityPopularQuizzes,
  useInfinityQuizzes,
} from '@/hooks/quizzServiceHooks'
import AlertComponent from '@/components/ui/alertComponent'
import Section from '@/components/ui/section'
import { ListPlus, ArrowUpNarrowWide } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import Search from '@/components/ui/search'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import HomeIntro from '../components/ui/homeIntro'

function PublicHome() {
  const [search, setSearch] = useState<string>('')
  const queryClient = useQueryClient()
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isRefetching,
  } = useInfinityQuizzes(search)
  const {
    data: dataPopularQuizzes,
    isLoading: isPopularQuizzesLoading,
    fetchNextPage: fetchNextPagePopularQuizzes,
    hasNextPage: hasPopularQuizzesNextPage,
    isFetchingNextPage: isFetchingPopularQuizzesNextPage,
    isError: isErrorPopularQuizzes,
    isRefetching: isRefetchingPopularQuizzes,
  } = useInfinityPopularQuizzes()

  const resetSearch = () => {
    setSearch('')
  }

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['quizzes'] })
  }, [search, queryClient])

  return (
    <>
      <HomeIntro>
        <span>Crie Para Qualquer Um</span>
        <span>Responda Para Qualquer Um</span>
      </HomeIntro>
      <Section title="Quizzes Mais Recentes" icon={ListPlus}>
        <div className="mb-4">
          <Search
            isSearching={isRefetching}
            submitSearch={handleSearch}
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
      </Section>
      <Section title="Quizzes Mais Populares" icon={ArrowUpNarrowWide}>
        {isPopularQuizzesLoading || isRefetchingPopularQuizzes ? (
          <div className="flex justify-center content-center">
            <Spinner className="size-8" />
          </div>
        ) : isErrorPopularQuizzes ? (
          <AlertComponent
            title="Não foi possível carregar quizzes!"
            alertType={'error'}
          >
            Ocorreu um erro ao carregar os quizzes!
          </AlertComponent>
        ) : dataPopularQuizzes?.pages[0].total ? (
          <CardsHome
            data={dataPopularQuizzes}
            hasNextPage={hasPopularQuizzesNextPage}
            isFetchingNextPage={isFetchingPopularQuizzesNextPage}
            fetchNextPage={fetchNextPagePopularQuizzes}
          />
        ) : (
          <AlertComponent title="Nenhum quiz encontrado!" alertType={'info'}>
            Não foi possível encontrar nenhum quiz.
          </AlertComponent>
        )}
      </Section>
    </>
  )
}

export default PublicHome
