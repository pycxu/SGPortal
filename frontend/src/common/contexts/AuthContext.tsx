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

  let signupUser = async (e) => {
    e.preventDefault()
    try {
      let response = await axios.post(`${baseURL}/accounts/signup/consumer/`, {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
      console.log(response)
      if (response.status === 200) {
        // progress par 2
        alert('Thank you for signing up! Plz verify your email!')
      } else {
        alert(response.statusText)
      }
    } catch (error) {
      alert(error)
    }
  }

  let loginUser = async (e) => {
    e.preventDefault()
    try {
      let response = await axios.post(`${baseURL}/accounts/login/`, {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      let jwtTokenPair = response.data
      if (response.status === 200) {
        setAuthTokens(jwtTokenPair)
        setUser(decodeToken(jwtTokenPair.access))
        localStorage.setItem('authTokens', JSON.stringify(jwtTokenPair))
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  let logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('/login')
  }

  let contextValue = {
    baseURL,
    signupUser,
    loginUser,
    logoutUser,
    authTokens,
    setAuthTokens,
    user,
    setUser,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}