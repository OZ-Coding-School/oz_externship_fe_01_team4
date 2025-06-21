import Header from '@components/Header'
import { menuData } from '@components/Sidebar/menuData'
import SideBarMenu from '@components/Sidebar/SideBarMenu'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className="flex h-screen">
      <SideBarMenu menuData={menuData} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
export default Layout
