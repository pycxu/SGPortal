import { createContext, useState } from 'react'

import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    const storedAuthToken = localStorage.getItem('authTokens');
    const [authTokens, setAuthTokens] = useState(() => storedAuthToken ? JSON.parse(storedAuthToken) : null)
    const [user, setUser] = useState(() => storedAuthToken ? decodeToken(JSON.parse(storedAuthToken).access) : null)

    const baseURL = import.meta.env.VITE_BACKEND_BASE_URL
    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await axios.post(`${baseURL}/accounts/login/`, {
            email: e.target.email.value,
            password: e.target.password.value
        })
        let jwt_tokenPair = response.data
        if(response.status === 200) {
            setAuthTokens(jwt_tokenPair)
            setUser(decodeToken(jwt_tokenPair.access))
            localStorage.setItem('authTokens', JSON.stringify(jwt_tokenPair))
            navigate('/dashboard')
        }else {
            alert('something went wrong!')
        }

    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let contextValue = {
        loginUser,
        logoutUser,
        authTokens,
        setAuthTokens,
        user,
        setUser
    }


    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}