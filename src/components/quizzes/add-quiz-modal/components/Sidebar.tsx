import { cn } from '@utils/cn'

type SidebarItem = {
  title: string
}

type SidebarProps = {
  items: SidebarItem[]
  currentTab: number
  setCurrentTab: (index: number) => void
}

const Sidebar = ({ items, currentTab, setCurrentTab }: SidebarProps) => {
  return (
    <div className="flex w-[220px] flex-shrink-0 flex-col border-r-[1px] border-[#DDDDDD]">
      <section className="mt-[30px] ml-[20px]">
        <div className="text-[18px] font-semibold text-[#222222]">
          문제 추가하기
        </div>
        <div className="mt-[10px] text-[10px] text-[#666666]">
          문제 유형을 선택하여 문제를 등록해주세요
        </div>
      </section>
      <section className="mt-[19px] flex flex-col">
        {items.map((item) => (
          <div
            className={cn(
              'flex h-[41px] cursor-pointer items-center pl-[21px] text-[16px] text-[#666666]',
              {
                'bg-[rgba(237,230,255,0.69)] text-[#522193]':
                  currentTab === items.indexOf(item),
              }
            )}
            onClick={() => setCurrentTab(items.indexOf(item))}
            key={item.title}
          >
            • {item.title}
          </div>
        ))}
      </section>
    </div>
  )
}

export default Sidebar
