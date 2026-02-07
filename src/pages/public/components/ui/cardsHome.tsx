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
import sliceLongText from '@/utils/sliceLongText'
import { Spinner } from '@/components/ui/spinner'
import { Badge } from '@/components/ui/badge'

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
            group.data.map(({ id, title, description, User: { name } }) => (
              <Card key={id} className="min-w-sm max-w-sm">
                <CardHeader className="grow">
                  <CardTitle>
                    {sliceLongText({ txt: title, sliceLength: 50 })}
                  </CardTitle>
                  <CardDescription>
                    {sliceLongText({ txt: description, sliceLength: 80 })}
                  </CardDescription>
                </CardHeader>
                <CardFooter
                  className={`${isMobile ? 'flex-col gap-3' : 'justify-between'}`}
                >
                  <Badge className="bg-accent">{name}</Badge>
                  <Button
                    variant={'secondary'}
                    asChild
                    className={`${isMobile ? 'w-[100%]' : ''}`}
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
            {isFetchingNextPage ? <Spinner /> : 'Carregar Mais'}
          </Button>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default CardsHome
