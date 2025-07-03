import type { SortOrder } from '@hooks/data-table/useSort'

export type TableRowData = {
  id: number // string 제거
  [key: string]: string | number | string[] | null // 타입추가
}

export type TableHeader = {
  text: string // 사용자에게 보여줄 컬럼 제목
  dataKey: string // 해당 컬럼에 매핑될 데이터 객체의 실제 속성 이름 (key)
  isCheckBox?: boolean // 체크박스 관련 속성 (선택 사항)
}

export type DataTableProps = {
  headerData: TableHeader[]
  tableItem: TableRowData[]
  sortKeys?: string[]
  isCheckBox?: boolean
  isDeploy?: boolean
  isDeployStatus?: boolean
  isDeploySwitch?: boolean
  sortKey: string | null
  sortOrder: SortOrder
  sortByKey: (key: string) => void
  isTime: boolean
  onDeployClick?: (data: TableRowData) => void
}

export type Pagination = {
  currentPage: number
  totalPages: number
  goPrev: () => void
  goNext: () => void
}

export type UsePaginationProps<T> = {
  item: T[]
  count: number
}
