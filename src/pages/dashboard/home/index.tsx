import { TableCell, TableRow } from '@/components/ui/table'
import DashboardCard from '../components/ui/dashboardCard'
import sliceLongText from '@/utils/sliceLongText'
import { Separator } from '@/components/ui/separator'
import { useUserQuizzes } from '@/hooks/quizzServiceHooks'
import TableComponent from '@/components/ui/tableComponent'

function DashboardHome() {
  const { data } = useUserQuizzes(0, 5, '')

  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-3">
        <DashboardCard
          cardTitle="Quizzes Criados"
          cardContent={data ? data.total : 0}
        />
      </div>
      <Separator className="my-4" />
      <div>
        <TableComponent
          headers={['id', 'Título', 'Data de Criação']}
          caption="Quizzes Criados Por Você Recentemente"
        >
          {data?.data.map(({ id, title, createdAt }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>
                {sliceLongText({ txt: title, sliceLength: 20 })}
              </TableCell>
              <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableComponent>
      </div>
    </div>
  )
}

export default DashboardHome
