import Header from '@components/layout/Header'
import { menuData } from '@constants/layout/sidebar/menuData'
import SideBarMenu from '@components/layout/sidebar/SideBarMenu'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className="flex h-screen">
      <SideBarMenu menuData={menuData} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
export default Layout
