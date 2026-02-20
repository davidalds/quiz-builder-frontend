import { Info, Pencil, Plus, Trash } from 'lucide-react'
import CreateQuiz from './createQuiz'
import { TableCell, TableRow } from '@/components/ui/table'
import { useUserQuizzes } from '@/hooks/quizzServiceHooks'
import PaginationComponent from '../components/ui/paginationComponent'
import { useEffect, useState } from 'react'
import { api } from '@/services'
import type { QuizSubmit } from '@/types/quizzes'
import { useQueryClient } from '@tanstack/react-query'
import SkeletonContent from '@/components/ui/skeletonContent'
import DialogComponent from '@/components/ui/dialogComponent'
import ConfirmDialog from '@/components/ui/confirmDialog'
import { toast } from 'react-toastify'
import AlertComponent from '@/components/ui/alertComponent'
import EditQuiz from './editQuiz'
import { useIsMobile } from '@/hooks/use-mobile'
import sliceLongText from '@/utils/sliceLongText'
import TableComponent from '@/components/ui/tableComponent'
import Search from '@/components/ui/search'
import InfoQuiz from './infoQuiz'

function QuizPageDashboard() {
  const limit = 15
  const [offset, setOffset] = useState<number>(0)
  const [search, setSearch] = useState<string>('')
  const { data, isLoading, isError, isRefetching } = useUserQuizzes(
    offset * limit,
    limit,
    search,
  )
  const isMobile = useIsMobile()

  const queryClient = useQueryClient()

  const handleOffset = (page: number) => {
    setOffset(page - 1)
  }

  const submitQuiz = async (data: QuizSubmit) => {
    try {
      await api.post('quizzes', data)
      queryClient.invalidateQueries({ queryKey: ['user_quizzes'] })
      toast.success('Quiz criado com sucesso!')
      return Promise.resolve()
    } catch (error) {
      toast.error('Ocorreu um erro ao criar quiz!')
      return Promise.reject(error)
    }
  }

  const handleEditQuiz = async (quizId: number, data: QuizSubmit) => {
    try {
      await api.put(`quizzes/${quizId}`, data)
      queryClient.invalidateQueries({ queryKey: ['user_quizzes', quizId] })
      toast.success('Quiz editado com sucesso!')
      return Promise.resolve()
    } catch (error) {
      toast.error('Ocorreu um erro ao editar quiz!')
      return Promise.reject(error)
    }
  }

  const handleDeleteQuiz = async (quizId: number) => {
    try {
      await api.delete(`quizzes/${quizId}`)
      queryClient.invalidateQueries({ queryKey: ['user_quizzes'] })
      toast.success('Quiz excluido com sucesso!')
      return Promise.resolve()
    } catch (error) {
      toast.error('Ocorreu um erro ao excluir quiz!')
      return Promise.reject(error)
    }
  }

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['user_quizzes'] })
  }, [search, queryClient])

  return (
    <div className="py-3">
      {isError ? (
        <AlertComponent
          title="Não foi possível carregar os seus quizzes!"
          alertType={'error'}
        >
          Ocorreu um erro ao carregar os seus quizzes
        </AlertComponent>
      ) : (
        <>
          <div
            className={`flex ${isMobile ? 'justify-center' : 'justify-end'} my-4`}
          >
            <DialogComponent
              btnTriggerIcon={Plus}
              btnTriggerText={'Criar Novo Quiz'}
            >
              <CreateQuiz submitQuiz={submitQuiz} />
            </DialogComponent>
          </div>
          <div className="my-2">
            <Search
              submitSearch={setSearch}
              isSearching={isRefetching}
              placeholder={'Título do Quiz'}
            />
          </div>
          <TableComponent
            headers={['id', 'Título', 'Ações']}
            caption="Quizzes Criados Por Você"
          >
            {isLoading ? (
              <TableRow>
                {Array.from({ length: 2 }).map((_, index) => (
                  <TableCell key={index}>
                    <SkeletonContent numberLines={limit} lineH={4} />
                  </TableCell>
                ))}
              </TableRow>
            ) : (
              data?.data.map(
                ({
                  id: quizId,
                  title,
                  description,
                  createdAt,
                  updatedAt,
                  _count: { Result },
                }) => (
                  <TableRow key={quizId}>
                    <TableCell>{quizId}</TableCell>
                    <TableCell>
                      {sliceLongText({ txt: title, sliceLength: 20 })}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <DialogComponent
                          btnTriggerIcon={Info}
                          btnTriggerText={!isMobile ? 'Informação' : ''}
                          btnVariant={'outline'}
                        >
                          <InfoQuiz
                            id={quizId}
                            title={title}
                            description={description}
                            createdAt={createdAt}
                            updatedAt={updatedAt}
                            result={Result}
                          />
                        </DialogComponent>
                        <DialogComponent
                          btnTriggerIcon={Pencil}
                          btnTriggerText={!isMobile ? 'Editar' : ''}
                          btnVariant={'secondary'}
                        >
                          <EditQuiz
                            quizId={String(quizId)}
                            submitQuiz={handleEditQuiz}
                          />
                        </DialogComponent>
                        <DialogComponent
                          btnTriggerIcon={Trash}
                          btnTriggerText={!isMobile ? 'Excluir' : ''}
                          btnVariant={'destructive'}
                        >
                          <ConfirmDialog
                            title="Confirmar Exclusão do Quiz?"
                            confirmCallback={() => handleDeleteQuiz(quizId)}
                          />
                        </DialogComponent>
                      </div>
                    </TableCell>
                  </TableRow>
                ),
              )
            )}
          </TableComponent>
          <PaginationComponent
            total={data?.total ? data.total : 0}
            perPage={limit}
            changeOffset={(page) => handleOffset(page)}
          />
        </>
      )}
    </div>
  )
}

export default QuizPageDashboard
