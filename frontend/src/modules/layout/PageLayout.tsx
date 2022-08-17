import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'
import Header from '../header'
import Footer from '../footer'

export default function Layout() {
  return (
    <div>
      <Header />
      <Container maxWidth={false} sx={{ maxWidth: '395px', minHeight: '50vh', mt: '20vh' }}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  )
}
