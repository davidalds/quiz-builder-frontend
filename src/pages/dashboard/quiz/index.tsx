import {
  Globe,
  GlobeLock,
  Info,
  Pencil,
  Plus,
  Trash,
  Bookmark,
  type LucideIcon,
} from 'lucide-react'
import CreateQuiz from './createQuiz'
import { TableCell, TableRow } from '@/components/ui/table'
import { useUserQuizzes } from '@/hooks/quizzServiceHooks'
import PaginationComponent from '../components/ui/paginationComponent'
import { useCallback, useEffect, useState } from 'react'
import { api } from '@/services'
import type { QuizStatus, QuizSubmit } from '@/types/quizzes'
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
import { useCategory } from '@/hooks/categoryServiceHooks'
import SelectComponent from '@/components/ui/SelectComponent'
import EditStatus from './editStatus'
import type { btnColors } from '@/types/theme'
import type { editStatusFormType } from '@/schemas/editStatusSchema'

function QuizPageDashboard() {
  const limit = 15
  const [offset, setOffset] = useState<number>(0)
  const [search, setSearch] = useState<string>('')
  const [categoryValue, setCategoryValue] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [statusValue, setStatusValue] = useState<QuizStatus | undefined>()
  const [status, setStatus] = useState<QuizStatus | undefined>()
  const { data, isLoading, isError, isRefetching } = useUserQuizzes(
    offset * limit,
    limit,
    category,
    status,
    search,
  )
  const { data: categories } = useCategory()
  const isMobile = useIsMobile()

  const queryClient = useQueryClient()

  const resetQueries = useCallback(
    () => queryClient.invalidateQueries({ queryKey: ['user_quizzes'] }),
    [queryClient],
  )

  const handleOffset = (page: number) => {
    setOffset(page - 1)
  }

  const submitQuiz = async (data: QuizSubmit) => {
    try {
      await api.post('quizzes', data)
      resetQueries()
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
      resetQueries()
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
      resetQueries()
      toast.success('Quiz excluido com sucesso!')
      return Promise.resolve()
    } catch (error) {
      toast.error('Ocorreu um erro ao excluir quiz!')
      return Promise.reject(error)
    }
  }

  const handleEditQuizStatus = async (
    quizId: number,
    data: editStatusFormType,
  ) => {
    try {
      await api.patch(`quizzes/${quizId}/status`, data)
      resetQueries()
      toast.success('Status do quiz modificado com sucesso!')
      return Promise.resolve()
    } catch (error) {
      toast.error('Ocorreu um erro ao modificar status do quiz!')
      return Promise.reject(error)
    }
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setCategory(categoryValue)
    setStatus(statusValue)
  }

  useEffect(() => {
    resetQueries()
  }, [search, category, status, queryClient, resetQueries])

  const handleStatus = (
    status: QuizStatus,
  ): {
    statusTxt: string
    statusIcon: LucideIcon
    statusColor: btnColors
  } => {
    switch (status) {
      case 'PRIVADO':
        return {
          statusTxt: 'Privado',
          statusIcon: GlobeLock,
          statusColor: 'destructive',
        }
      case 'NAO_LISTADO':
        return {
          statusTxt: 'Não Listado',
          statusIcon: Bookmark,
          statusColor: 'secondary',
        }
      default:
        return {
          statusTxt: 'Público',
          statusIcon: Globe,
          statusColor: 'default',
        }
    }
  }

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
          <div className="my-2 flex gap-2">
            <Search
              submitSearch={handleSearch}
              isSearching={isRefetching}
              placeholder={'Título do Quiz'}
              selectors={[
                <SelectComponent
                  label="Categorias"
                  defaultValue="Selecione Categoria"
                  defaultItem={{ text: 'Todas', value: 'all' }}
                  changeValue={setCategoryValue}
                  items={categories?.map(({ title, slug }) => ({
                    text: title,
                    value: slug,
                  }))}
                />,
                <SelectComponent
                  label="Status"
                  defaultValue="Status"
                  defaultItem={{ text: 'Todos', value: 'all' }}
                  changeValue={(value) =>
                    setStatusValue(value ? (value as QuizStatus) : undefined)
                  }
                  items={[
                    { text: 'Público', value: 'PUBLICO' },
                    { text: 'Privado', value: 'PRIVADO' },
                    { text: 'Não Listado', value: 'NAO_LISTADO' },
                  ]}
                />,
              ]}
            />
          </div>
          <TableComponent
            headers={['id', 'Título', 'Categoria(s)', 'Status', 'Ações']}
            caption="Quizzes Criados Por Você"
          >
            {isLoading ? (
              <TableRow>
                {Array.from({ length: 4 }).map((_, index) => (
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
                  status,
                  description,
                  createdAt,
                  updatedAt,
                  categories,
                  _count: { results },
                }) => (
                  <TableRow key={quizId}>
                    <TableCell>{quizId}</TableCell>
                    <TableCell>
                      {sliceLongText({ txt: title, sliceLength: 20 })}
                    </TableCell>
                    <TableCell>
                      {sliceLongText({
                        txt: categories.map(({ title }) => title).join(';'),
                        sliceLength: 30,
                      })}
                    </TableCell>
                    <TableCell>
                      <DialogComponent
                        btnTriggerIcon={handleStatus(status).statusIcon}
                        btnTriggerText={handleStatus(status).statusTxt}
                        btnVariant={handleStatus(status).statusColor}
                      >
                        <EditStatus
                          status={status}
                          quizId={quizId}
                          submitQuiz={handleEditQuizStatus}
                        />
                      </DialogComponent>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <DialogComponent
                          btnTriggerIcon={Info}
                          btnTriggerText={!isMobile ? 'Info' : ''}
                          btnVariant={'outline'}
                        >
                          <InfoQuiz
                            id={quizId}
                            title={title}
                            status={status}
                            description={description}
                            createdAt={createdAt}
                            updatedAt={updatedAt}
                            result={results}
                            categories={categories
                              .map(({ title }) => title)
                              .join(';')}
                          />
                        </DialogComponent>
                        <DialogComponent
                          btnTriggerIcon={Pencil}
                          btnTriggerText={!isMobile ? 'Editar' : ''}
                          btnVariant={'outline'}
                        >
                          <EditQuiz
                            quizId={String(quizId)}
                            submitQuiz={handleEditQuiz}
                          />
                        </DialogComponent>
                        <DialogComponent
                          btnTriggerIcon={Trash}
                          btnTriggerText={!isMobile ? 'Excluir' : ''}
                          btnVariant={'outline'}
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
