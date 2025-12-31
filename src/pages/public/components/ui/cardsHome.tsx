import LoadingComponent from '@/components/ui/loadingComponent'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardDescription,
} from '@/components/ui/card'
import type { ResponseQuizzes } from '@/types/quizzes'
import type { InfiniteData } from '@tanstack/react-query'
import { Link } from 'react-router'
import { useIsMobile } from '@/hooks/use-mobile'

interface IProps {
  data: InfiniteData<ResponseQuizzes, unknown> | undefined
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

function CardsHome({
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: IProps) {
  const isMobile = useIsMobile()

  return (
    <>
      <div
        className={`flex ${isMobile ? 'flex-col items-center' : 'flex-row'} justify-center flex-wrap gap-4`}
      >
        {data !== undefined ? (
          data.pages.map((group) =>
            group.data.map(({ id, title, description }) => (
              <Card key={id} className="min-w-sm max-w-sm">
                <CardHeader className="grow">
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardFooter
                  className={`${isMobile ? 'justify-center' : 'justify-end'}`}
                >
                  <Button
                    variant={'secondary'}
                    asChild
                    className={`${isMobile ? 'grow' : ''}`}
                  >
                    <Link to={`quiz/${id}`}>Acessar</Link>
                  </Button>
                </CardFooter>
              </Card>
            )),
          )
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-center mt-6">
        {hasNextPage ? (
          <Button disabled={isFetchingNextPage} onClick={fetchNextPage}>
            {isFetchingNextPage ? <LoadingComponent /> : 'Carregar Mais'}
          </Button>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default CardsHome
