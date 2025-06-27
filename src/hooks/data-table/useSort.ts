import { useState, useMemo } from 'react'
import type { TableRowData } from '@custom-types/table'

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER]

export function useSort(initialData: TableRowData[]) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(SORT_ORDER.ASC)

  const sortedData = useMemo(() => {
    if (!sortKey) {
      return initialData
    }

    const sorted = [...initialData].sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === SORT_ORDER.ASC ? valA - valB : valB - valA
      }

      return sortOrder === SORT_ORDER.ASC
        ? String(valA).localeCompare(String(valB), undefined, { numeric: true })
        : String(valB).localeCompare(String(valA), undefined, { numeric: true })
    })

    return sorted
  }, [initialData, sortKey, sortOrder])

  const sortByKey = (key: string) => {
    let newOrder: SortOrder

    if (sortKey === key) {
      newOrder = sortOrder === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC
    } else {
      newOrder = SORT_ORDER.DESC
    }

    setSortKey(key)
    setSortOrder(newOrder)
  }

  return { sortedData, sortKey, sortOrder, sortByKey }
}
