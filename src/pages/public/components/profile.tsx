import { Button } from '@/components/ui/button'
import DialogComponent from '@/components/ui/dialogComponent'
import { TableCell, TableRow } from '@/components/ui/table'
import TableComponent from '@/components/ui/tableComponent'
import { useResultQuizzes } from '@/hooks/resultService'
import PaginationComponent from '@/pages/dashboard/components/ui/paginationComponent'
import sliceLongText from '@/utils/sliceLongText'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import ResultDialog from './ui/resultDialog'
import CardProfile from './ui/cardProfile'

function Profile() {
  const limit = 10
  const [offset, setOffset] = useState<number>(0)
  const { data } = useResultQuizzes(offset, limit)

  const handleOffset = (page: number) => {
    setOffset(page - 1)
  }

  return (
    <div className="flex flex-col gap-4">
      <CardProfile />
      <div>
        <TableComponent
          headers={['Id', 'Título', 'Feito em', 'Refeito em', 'Ações']}
          caption="Histórico de quizzes respondidos por você"
        >
          {data?.quizzes.map(({ id, title, done, redone }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>
                {sliceLongText({ txt: title, sliceLength: 30 })}
              </TableCell>
              <TableCell>{new Date(done).toLocaleString()}</TableCell>
              <TableCell>
                {done === redone ? '--' : new Date(redone).toLocaleString()}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button variant={'secondary'} asChild>
                  <Link to={`/quiz/${id}`}>
                    <ArrowRight />
                    Acessar
                  </Link>
                </Button>
                <DialogComponent btnTriggerText={'Ver Resultado'}>
                  <ResultDialog quizId={id} guestId={''} />
                </DialogComponent>
              </TableCell>
            </TableRow>
          ))}
        </TableComponent>
        <PaginationComponent
          total={data?.total ? data.total : 0}
          perPage={limit}
          changeOffset={(page) => handleOffset(page)}
        />
      </div>
    </div>
  )
}

export default Profile
