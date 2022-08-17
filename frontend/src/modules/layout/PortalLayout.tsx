import { Outlet } from 'react-router-dom'
import Header from '../header'
import Footer from '../footer'
import Content from '../portal/content'

export default function PortalLayout() {
  return (
    <div>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </div>
  )
}
