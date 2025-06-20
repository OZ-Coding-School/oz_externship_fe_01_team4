interface DataTableProps {
  headerData: string[]
  tableItem: Array<Record<string, unknown>>
}

export default function DataTable({ headerData, tableItem }: DataTableProps) {
  const headers = headerData.map((text) => ({ text, colspan: 1 }))
  const data = tableItem

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[lightgray]">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                colSpan={header.colspan || 1}
                className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-center"
              >
                {header.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, itemIndex) => (
            <tr key={itemIndex}>
              {Object.values(item).map((value, valueIndex) => (
                <td
                  key={valueIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                >
                  {String(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
