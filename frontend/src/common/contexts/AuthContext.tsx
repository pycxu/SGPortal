import { createContext, useState } from 'react'

import { decodeToken } from 'react-jwt'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
  const storedAuthToken = localStorage.getItem('authTokens')
  const [authTokens, setAuthTokens] = useState(() =>
    storedAuthToken ? JSON.parse(storedAuthToken) : null,
  )
  const [user, setUser] = useState(() =>
    storedAuthToken ? decodeToken(JSON.parse(storedAuthToken).access) : null,
  )

  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL
  const navigate = useNavigate()

  const signupConsumer = async (data) => {
    const response = await axios.post(`${baseURL}/accounts/signup/consumer/`, {
      username: data.username,
      email: data.email,
      password: data.password,
    })
    return response.data
  }

  const loginUser = async (data) => {
    const response = await axios.post(`${baseURL}/accounts/login/`, {
      email: data.email,
      password: data.password,
    })
    return response.data
  }

  const storedAuthTokens = (authTokens) => {
    setAuthTokens(authTokens)
    setUser(decodeToken(authTokens.access))
    localStorage.setItem('authTokens', JSON.stringify(authTokens))
  }

  const forgetPassword = async (data) => {
    const response = await axios.post(`${baseURL}/accounts/forget-password/`, {
      email: data.email,
    })
    return response.data
  }

  const resetPassword = async ({ uidb64, token, password }) => {
    const response = await axios.post(`${baseURL}/accounts/reset-password/`, {
      uidb64,
      token,
      password,
    })
    return response.data
  }

  const verifyEmail = async ({ uidb64, token }) => {
    const response = await axios.post(`${baseURL}/accounts/verify-email/`, {
      uidb64,
      token,
    })
    return response.data
  }

  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('/login')
  }

  const contextValue = {
    signupConsumer,
    loginUser,
    storedAuthTokens,
    forgetPassword,
    resetPassword,
    verifyEmail,
    logoutUser,
    authTokens,
    setAuthTokens,
    user,
    setUser,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
