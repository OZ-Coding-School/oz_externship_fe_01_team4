import { useState, useMemo } from 'react'
import type { UsePaginationProps } from '@custom-types/table'

export function usePagination<T>({ item, count }: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = useMemo(
    () => Math.ceil(item.length / count),
    [item.length, count]
  )

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * count
    return item.slice(start, start + count)
  }, [item, currentPage, count])

  const goToPage = (page: number) => {
    const next = Math.min(Math.max(1, page), totalPages)
    setCurrentPage(next)
  }

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    setCurrentPage,
  }
}
