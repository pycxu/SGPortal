import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext'

import Signup from './pages/Signup';
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import VerifyEmail from './pages/VerifyEmail'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound'
import Header from './components/Header'

function App() {

  return (
    <AuthProvider>
        <Header />
        <Routes>
          <Route index element={<Signup/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="forget-password" element={<ForgetPassword/>}/>
          <Route path="verify-email/:uidb64/:token/" element={<VerifyEmail />} />
          <Route path="reset-password/:uidb64/:token/" element={<ResetPassword />} />
          <Route path="dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </AuthProvider>
  )
}

export default App
