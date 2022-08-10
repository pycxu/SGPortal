import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext'

import Signup from './pages/Signup';
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import Dashboard from './pages/Dashboard';
import Header from './components/Header'

function App() {

  return (
    <AuthProvider>
        <Header />
        <Routes>
          <Route index element={<Signup/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="verify-email/:uidb64/:token/" element={<VerifyEmail />} />
          <Route path="dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        </Routes>
    </AuthProvider>
  )
}

export default App
