import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useState } from 'react'

interface IProps {
  total: number
  perPage: number
  changeOffset: (page: number) => void
}

function PaginationComponent({ total, perPage, changeOffset }: IProps) {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const totalPages = Math.ceil(total / perPage)

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      changeOffset(page)
    }
  }

  const getPages = () => {
    const delta = 2
    const pages: (number | string)[] = []
    const range: number[] = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      pages.push('left-ellipsis')
    }

    pages.push(...range)

    if (currentPage + delta < totalPages - 1) {
      pages.push('right-ellipsis')
    }

    return totalPages > 1 ? [1, ...pages, totalPages] : [1]
  }

  return (
    <Pagination className="mt-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handleClick(currentPage - 1)}
            hidden={currentPage === 1}
          />
        </PaginationItem>
        {getPages().map((p, index) =>
          typeof p === 'number' ? (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={p === currentPage}
                onClick={() => handleClick(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => handleClick(currentPage + 1)}
            hidden={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComponent
