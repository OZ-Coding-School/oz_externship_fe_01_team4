import { useState, useEffect } from 'react'

// --- 타입 정의 시작 ---
type TableRowData = {
  id: number | string // 'id'는 React key로 사용되므로 필수
  [key: string]: string | number
}

type Header = {
  text: string // 사용자에게 보여줄 컬럼 제목
  dataKey: string // 해당 컬럼에 매핑될 데이터 객체의 실제 속성 이름 (key)
  checkBox?: boolean // 체크박스 관련 속성 (선택 사항)
}

interface DataTableProps {
  headerData: Header[]
  tableItem: TableRowData[]
  checkBox?: boolean
  sortKeys?: string[]
}
// --- 타입 정의 끝 ---

const ITEMS_PER_PAGE = 10

export default function DataTable({
  headerData,
  tableItem,
  checkBox,
  sortKeys = [],
}: DataTableProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortKey, setSortKey] = useState<string | null>('id')

  const [items, setItems] = useState(() => {
    const initiallySorted = [...tableItem].sort((a, b) =>
      String(a.id).localeCompare(String(b.id), undefined, { numeric: true })
    )
    return initiallySorted
  })

  useEffect(() => {
    const initiallySorted = [...tableItem].sort((a, b) =>
      String(a.id).localeCompare(String(b.id), undefined, { numeric: true })
    )
    setItems(initiallySorted)
    setSortKey('id')
    setSortOrder('asc')
  }, [tableItem])

  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentItems = items.slice(startIndex, endIndex)

  const emptyRowsCount = ITEMS_PER_PAGE - currentItems.length
  const emptyRows = Array.from({ length: emptyRowsCount })

  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const handleSort = (key: string) => {
    let newOrder: 'asc' | 'desc'

    if (sortKey === key) {
      newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      newOrder = 'desc'
    }

    const sorted = [...items].sort((a, b) => {
      const valA = a[key]
      const valB = b[key]

      if (valA === undefined || valB === undefined) return 0

      if (typeof valA === 'number' && typeof valB === 'number') {
        return newOrder === 'asc' ? valA - valB : valB - valA
      }
      return newOrder === 'asc'
        ? String(valA).localeCompare(String(valB), undefined, { numeric: true })
        : String(valB).localeCompare(String(valA), undefined, { numeric: true })
    })

    setItems(sorted)
    setSortKey(key)
    setSortOrder(newOrder)
    setCheckedItems(new Set())
  }

  const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems((prev) => {
      const newChecked = new Set(prev)
      if (e.target.checked) {
        currentItems.forEach((item) => newChecked.add(String(item.id)))
      } else {
        currentItems.forEach((item) => newChecked.delete(String(item.id)))
      }
      return newChecked
    })
  }

  const toggleItem = (id: number | string, checked: boolean) => {
    setCheckedItems((prev) => {
      const newChecked = new Set(prev)
      if (checked) newChecked.add(String(id))
      else newChecked.delete(String(id))
      return newChecked
    })
  }

  const allChecked =
    currentItems.length > 0 &&
    currentItems.every((item) => checkedItems.has(String(item.id)))

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)

  const goPrev = () => {
    setCurrentPage((page) => Math.max(page - 1, 1))
    setCheckedItems(new Set())
  }

  const goNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages))
    setCheckedItems(new Set())
  }

  const fixedColumnWidth = 'w-[150px]' // 픽셀 값으로 고정

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700 table-fixed">
        <thead className="bg-gray-100">
          <tr>
            {/* 전체 체크박스 컬럼 */}
            {checkBox && (
              <th className="p-2 border-b border-gray-300 text-center w-12 overflow-hidden text-ellipsis">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                  aria-label="전체 선택"
                />
              </th>
            )}
            {/* 헤더 컬럼 렌더링 */}
            {headerData.map((header) => (
              <th
                key={header.dataKey}
                // 고정 픽셀 너비 클래스 적용
                className={`p-2 border-b border-gray-300 whitespace-nowrap text-center overflow-hidden text-ellipsis ${fixedColumnWidth}`}
              >
                <div className="flex items-center gap-1 justify-center">
                  <span>{header.text}</span>
                  {sortKeys.includes(header.dataKey) && (
                    <button
                      onClick={() => handleSort(header.dataKey)}
                      className="text-xs text-gray-500 hover:text-gray-800"
                      aria-label={`${header.text} 정렬`}
                    >
                      {sortKey === header.dataKey
                        ? sortOrder === 'asc'
                          ? '▲'
                          : '▼'
                        : '▲'}
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* 실제 데이터 행 렌더링 */}
          {currentItems.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 transition-colors duration-200 text-center"
            >
              {checkBox && (
                <td className="p-2 border-b border-gray-200 w-12 overflow-hidden text-ellipsis">
                  <input
                    type="checkbox"
                    checked={checkedItems.has(String(item.id))}
                    onChange={(e) => toggleItem(item.id, e.target.checked)}
                    aria-label={`선택 ${item.id}`}
                  />
                </td>
              )}
              {headerData.map((header, colIdx) => (
                <td
                  key={colIdx}
                  // 고정 픽셀 너비 클래스 적용
                  className={`p-2 border-b border-gray-200 whitespace-nowrap h-[50px] overflow-hidden text-ellipsis ${fixedColumnWidth}`}
                >
                  {item[header.dataKey]}
                </td>
              ))}
            </tr>
          ))}

          {/* 빈 행 렌더링 (테이블 최소 높이 유지) */}
          {emptyRows.map((_, idx) => (
            <tr key={`empty-${idx}`} className="h-[50px]">
              {checkBox && <td className="border-b border-gray-200 w-12"></td>}
              {headerData.map((_, colIdx) => (
                <td
                  key={colIdx}
                  className={`border-b border-gray-200 ${fixedColumnWidth}`}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 컨트롤 */}
      <div className="mt-2 flex justify-center gap-2">
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
          aria-label="이전 페이지"
        >
          이전
        </button>
        <span className="flex items-center">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
          aria-label="다음 페이지"
        >
          다음
        </button>
      </div>
    </div>
  )
}
