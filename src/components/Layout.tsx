import Header from '@components/layout/Header'
import SideBarMenu from '@components/layout/sidebar/SideBarMenu'
import { menuData } from '@constants/layout/sidebar/menuData'

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
