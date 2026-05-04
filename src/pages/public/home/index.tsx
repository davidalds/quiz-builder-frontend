import CardsHome from '../components/ui/cardsHome'
import {
  useInfinityPopularQuizzes,
  useInfinityQuizzes,
} from '@/hooks/quizzServiceHooks'
import AlertComponent from '@/components/ui/alertComponent'
import { Spinner } from '@/components/ui/spinner'
import Search from '@/components/ui/search'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useIsMobile } from '@/hooks/use-mobile'
import SelectComponent from '@/components/ui/SelectComponent'
import { useCategory } from '@/hooks/categoryServiceHooks'

function PublicHome() {
  const [search, setSearch] = useState<string>('')
  const queryClient = useQueryClient()
  const isMobile = useIsMobile()
  const [categoryValue, setCategoryValue] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isRefetching,
  } = useInfinityQuizzes(search, category)
  const {
    data: dataPopularQuizzes,
    isLoading: isPopularQuizzesLoading,
    fetchNextPage: fetchNextPagePopularQuizzes,
    hasNextPage: hasPopularQuizzesNextPage,
    isFetchingNextPage: isFetchingPopularQuizzesNextPage,
    isError: isErrorPopularQuizzes,
    isRefetching: isRefetchingPopularQuizzes,
  } = useInfinityPopularQuizzes(search, category)
  const { data: categories } = useCategory()

  const handleSearch = (value: string) => {
    setSearch(value)
    setCategory(categoryValue)
  }

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['quizzes'] })
  }, [search, category, queryClient])

  return (
    <>
      <div className="flex justify-center">
        <div className={isMobile ? 'basis-full' : 'basis-2/3'}>
          <Tabs defaultValue="new">
            <TabsList variant={'line'}>
              <TabsTrigger value="new">Quizzes Recentes</TabsTrigger>
              <TabsTrigger value="popular">Quizzes Populares</TabsTrigger>
            </TabsList>
            <div className="my-2">
              <Search
                isSearching={isRefetching}
                submitSearch={handleSearch}
                placeholder={'Título do Quiz ou Nome de Usuário'}
                selectors={
                  <SelectComponent
                    label="Categorias"
                    defaultValue="Selecione Categoria"
                    defaultItem={{ text: 'Todas', value: 'all' }}
                    changeValue={setCategoryValue}
                    items={categories?.map(({ title, slug }) => ({
                      text: title,
                      value: slug,
                    }))}
                  />
                }
              />
            </div>
            <TabsContent value="new">
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
                <AlertComponent
                  title="Nenhum quiz encontrado!"
                  alertType={'info'}
                >
                  Não foi possível encontrar nenhum quiz.
                </AlertComponent>
              )}
            </TabsContent>
            <TabsContent value="popular">
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
                <AlertComponent
                  title="Nenhum quiz encontrado!"
                  alertType={'info'}
                >
                  Não foi possível encontrar nenhum quiz.
                </AlertComponent>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default PublicHome
