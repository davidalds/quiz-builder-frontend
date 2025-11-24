import LoadingComponent from '@/components/ui/loadingComponent'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardDescription,
} from '@/components/ui/card'
import type { responseQuizzes } from '@/types/quizzes'
import type { InfiniteData } from '@tanstack/react-query'
import { Link } from 'react-router'

interface IProps {
  data: InfiniteData<responseQuizzes, unknown> | undefined
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
  return (
    <>
      <div className="flex flex-wrap gap-4">
        {data !== undefined ? (
          data.pages.map((group) =>
            group.data.map(({ id, title, description }) => (
              <Card key={id} className="min-w-sm max-w-sm">
                <CardHeader className="grow">
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardFooter className="justify-end">
                  <Button asChild>
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

      <div className="flex justify-center mt-4">
        {hasNextPage ? (
          isFetchingNextPage ? (
            <LoadingComponent />
          ) : (
            <Button onClick={fetchNextPage}>Carregar Mais</Button>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default CardsHome
