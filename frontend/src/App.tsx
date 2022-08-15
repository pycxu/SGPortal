import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './modules/privateRoute'

import Layout from './modules/layout'
import Home from './pages/home'
import SignupConsumer from './pages/signup-consumer'
import SignupSuccess from './pages/signup-success'
import Login from './pages/login'
import ForgetPassword from './pages/forget-password'
import ForgetPasswordSuccess from './pages/forget-password-success'
import VerifyEmail from './pages/verify-email'
import ResetPassword from './pages/reset-password'
import Dashboard from './pages/dashboard'
import PageNotFound from './pages/page-not-found'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='signup-consumer/' element={<SignupConsumer />} />
        <Route path='signup-success/' element={<SignupSuccess />} />
        <Route path='login/' element={<Login />} />
        <Route path='forget-password/' element={<ForgetPassword />} />
        <Route path='forget-password-success/' element={<ForgetPasswordSuccess />} />
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
