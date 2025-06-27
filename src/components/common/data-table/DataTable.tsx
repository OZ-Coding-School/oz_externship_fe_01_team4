import TableHeader from '@components/common/data-table/TableHeader'
import TableRow from '@components/common/data-table/TableRow'
import { useSelection } from '@hooks/data-table/useSelection'
import type { DataTableProps } from '@custom-types/table'

export default function DataTable({
  headerData,
  tableItem,
  isCheckBox,
  sortKeys = [],
  sortKey,
  sortOrder,
  sortByKey,
  isTime,
}: DataTableProps) {
  const { checkedItems, toggleItem, toggleAll, isAllChecked } = useSelection()

  // 빈 행 개수 계산
  const emptyRow = 10
  const emptyCount = emptyRow - tableItem.length

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed border-t-1 border-[#DDDDDD] text-left text-sm">
        <TableHeader
          headers={headerData}
          isCheckBox={isCheckBox}
          sortKeys={sortKeys}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={sortByKey}
          isAllChecked={isAllChecked(tableItem.map((i) => String(i.id)))}
          onToggleAll={(e) =>
            toggleAll(
              tableItem.map((i) => String(i.id)),
              e.target.checked
            )
          }
        />
        <tbody>
          {tableItem.map((item) => (
            <TableRow
              key={item.id}
              data={item}
              headers={headerData}
              isCheckBox={isCheckBox}
              isChecked={checkedItems.has(String(item.id))}
              onToggle={(checked) => toggleItem(String(item.id), checked)}
              isTime={isTime}
            />
          ))}

          {/* 빈 행 */}
          {Array.from({ length: emptyCount }).map((_, idx) => (
            <tr key={`empty-${idx}`} className="h-[50px]">
              {isCheckBox && <td className="w-12 border-b border-[#DDDDDD]" />}
              {headerData.map((_, colIdx) => (
                <td
                  key={colIdx}
                  className="w-[150px] border-b border-[#DDDDDD]"
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
