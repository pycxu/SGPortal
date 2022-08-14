import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './modules/privateRoute'

import Layout from './modules/layout'
import SignupConsumer from './pages/signup-consumer'
import Login from './pages/login'
import ForgetPassword from './pages/forget-password'
import VerifyEmail from './pages/verify-email'
import ResetPassword from './pages/reset-password'
import Dashboard from './pages/dashboard'
import PageNotFound from './pages/page-not-found'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<SignupConsumer />} />
        <Route path='login' element={<Login />} />
        <Route path='forget-password' element={<ForgetPassword />} />
        <Route path='verify-email/:uidb64/:token/' element={<VerifyEmail />} />
        <Route path='reset-password/:uidb64/:token/' element={<ResetPassword />} />
        <Route
          path='dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}
