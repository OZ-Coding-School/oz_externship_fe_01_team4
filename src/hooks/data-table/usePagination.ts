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

  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1))
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages))

  return {
    currentPage,
    totalPages,
    paginatedData,
    goPrev,
    goNext,
    setCurrentPage,
  }
}
