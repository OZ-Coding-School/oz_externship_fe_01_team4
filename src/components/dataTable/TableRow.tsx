import Button from '@components/Button'
import type { TableHeader, TableRowData } from '@customType/table'
import { cn } from '@utils/cn'
import { useState } from 'react'

type Props = {
  data: TableRowData
  headers: TableHeader[]
  isCheckBox?: boolean
  isChecked: boolean
  onToggle: (checked: boolean) => void
  isDeploy?: boolean
  isDeploySwitch?: boolean
  isDeployStatus?: boolean
  isTime?: boolean
}

export default function TableRow({
  data,
  headers,
  isCheckBox,
  isChecked,
  onToggle,
  isDeployStatus,
  isTime,
}: Props) {
  const DATA_KEYS = {
    DEPLOY: 'deploy',
    DEPLOY_SWITCH: 'deploySwitch',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    TYPE: 'type',
    ROLE: 'role',
  } as const

  const CATEGORY_TYPE = {
    LARGE: '대',
    MEDIUM: '중',
    SMALL: '소',
  } as const

  const USER_ROLE = {
    ADMIN: 'ADMIN',
    STAFF: 'STAFF',
    STUDENT: 'STUDENT',
  }

  const [deployStatus, setDeployStatus] = useState(isDeployStatus)

  const handleDeploy = () => {
    setDeployStatus(true)
  }
  const toggleSwitch = () => {
    setDeployStatus((prev) => !prev)
  }

  const formatIsoToDotDateTime = (isoString: string) => {
    const cleaned = isoString.replace('Z', '') // 끝에 Z 제거
    const [date, time] = cleaned.split('T') // '2025-06-01', '12:00:00'
    const formattedDate = date.replace(/-/g, '.') // '2025.06.01'

    if (isTime) {
      return `${formattedDate} ${time}`
    } else {
      return `${formattedDate}`
    }
  }

  return (
    <tr className="h-[50px] border-b border-[#DDDDDD] text-center hover:bg-[#F7F7F7]">
      {isCheckBox && (
        <td className="w-12 p-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onToggle(e.target.checked)}
          />
        </td>
      )}
      {headers.map((header, i) => (
        <td key={i} className="w-[150px] p-2">
          {(() => {
            const value = data[header.dataKey]

            // 공백 대시 처리
            const isValueEmpty =
              value === undefined ||
              value === null ||
              value === '' ||
              (Array.isArray(value) && value.length === 0)

            const isNotIgnoredKey =
              header.dataKey !== DATA_KEYS.DEPLOY &&
              header.dataKey !== DATA_KEYS.DEPLOY_SWITCH

            if (isValueEmpty && isNotIgnoredKey) {
              return '-'
            }

            switch (header.dataKey) {
              case DATA_KEYS.DEPLOY:
                return <Button onClick={handleDeploy}>배포</Button>
              case DATA_KEYS.DEPLOY_SWITCH:
                return (
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={deployStatus}
                      onChange={toggleSwitch}
                      className="peer sr-only"
                    />
                    <div
                      className={cn(
                        `peer peer-checked:bg-[#5EB669] peer-focus:ring-2 peer-focus:ring-[#5EB669] peer-focus:outline-none`,
                        `peer-checked:after:translate-x-full peer-checked:after:border-[#F5F5F5]`,
                        `after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full`,
                        `after:border after:border-[#F5F5F5] after:bg-white after:transition-all after:content-['']`,
                        `h-6 w-11 rounded-full bg-[#DDDDDD]`
                      )}
                    ></div>
                  </label>
                )
              case DATA_KEYS.TYPE:
                switch (value) {
                  case CATEGORY_TYPE.LARGE:
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#522193] py-1 font-bold text-[#F7F7F7]">
                        대분류
                      </div>
                    )
                  case CATEGORY_TYPE.MEDIUM:
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#d7cbf7] py-1 font-bold text-[#522193]">
                        중분류
                      </div>
                    )
                  case CATEGORY_TYPE.SMALL:
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#f2effd] py-1 font-bold text-[#522193]">
                        소분류
                      </div>
                    )
                  default:
                    return value
                }
              case DATA_KEYS.ROLE:
                switch (value) {
                  case USER_ROLE.ADMIN:
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#522193] py-1 font-bold text-[#F7F7F7]">
                        Admin
                      </div>
                    )
                  case USER_ROLE.STUDENT:
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#d7cbf7] py-1 font-bold text-[#522193]">
                        Student
                      </div>
                    )
                  case USER_ROLE.STAFF:
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#f2effd] py-1 font-bold text-[#522193]">
                        Staff
                      </div>
                    )
                  default:
                    return value
                }
              case DATA_KEYS.CREATED_AT:
              case DATA_KEYS.UPDATED_AT:
                return formatIsoToDotDateTime(String(value))
              default:
                return value
            }
          })()}
        </td>
      ))}
    </tr>
  )
}
