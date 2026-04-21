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
import { Badge } from '@/components/ui/badge'
import FetchingButton from '@/components/ui/fetchingButton'

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
      <div className={`flex flex-col items-center gap-4`}>
        {data !== undefined ? (
          data.pages.map((group) =>
            group.data.map(
              ({ publicId, title, description, User: { name } }) => (
                <Card key={publicId} className="min-w-sm max-w-sm">
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
                      <Link to={`/quiz/${publicId}`}>Acessar</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ),
            ),
          )
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-center mt-6">
        {hasNextPage ? (
          <FetchingButton
            variant={'secondary'}
            isFetching={isFetchingNextPage}
            fetchingFunc={fetchNextPage}
            buttonContent="Carregar Mais"
          />
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default CardsHome
