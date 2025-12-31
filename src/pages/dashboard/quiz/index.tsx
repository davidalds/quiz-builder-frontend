import { Pencil, Plus, Trash } from 'lucide-react'
import CreateQuiz from './createQuiz'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useUserQuizzes } from '@/hooks/quizzServiceHooks'
import PaginationComponent from '../components/ui/paginationComponent'
import { useState } from 'react'
import { api } from '@/services'
import type { QuizSubmit } from '@/types/quizzes'
import { useQueryClient } from '@tanstack/react-query'
import SkeletonContent from '@/components/ui/skeletonContent'
import DialogComponent from '@/components/ui/dialogComponent'
import ConfirmDialog from '@/components/ui/confirmDialog'
import { toast } from 'react-toastify'
import AlertComponent from '@/components/ui/alertComponent'
import EditQuiz from './editQuiz'

function QuizPageDashboard() {
  const limit = 15
  const [offset, setOffset] = useState<number>(0)
  const { data, isLoading, isError } = useUserQuizzes(offset * limit, limit)

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
          <div className="flex justify-end">
            <DialogComponent
              btnTriggerIcon={Plus}
              btnTriggerText={'Criar Novo Quiz'}
            >
              <CreateQuiz submitQuiz={submitQuiz} />
            </DialogComponent>
          </div>
          <Table className="my-3">
            <TableCaption>Lista dos quizzes criados por você</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  {Array.from({ length: 2 }).map((_, index) => (
                    <TableCell key={index}>
                      <SkeletonContent numberLines={limit} lineH={4} />
                    </TableCell>
                  ))}
                </TableRow>
              ) : (
                data?.data.map(({ id: quizId, title }) => (
                  <TableRow key={quizId}>
                    <TableCell>{quizId}</TableCell>
                    <TableCell>{title}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <DialogComponent
                          btnTriggerIcon={Pencil}
                          btnTriggerText="Editar"
                          btnVariant={'secondary'}
                        >
                          <EditQuiz
                            quizId={String(quizId)}
                            submitQuiz={handleEditQuiz}
                          />
                        </DialogComponent>
                        <DialogComponent
                          btnTriggerIcon={Trash}
                          btnTriggerText="Excluir"
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
                ))
              )}
            </TableBody>
          </Table>
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
