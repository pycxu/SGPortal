import { useContext } from 'react'
import { isExpired, decodeToken } from "react-jwt";
import axios from 'axios'

import AuthContext from '../context/AuthContext'

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL

const useAxios = () => {
    const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers: {Authorization: `Bearer ${authTokens?.access}`}
    })

    axiosInstance.interceptors.request.use(async req => {
    
        if(!isExpired(authTokens.access)) return req
    
        const response = await axios.post(`${baseURL}/api/v1/token/refresh/`, {
            refresh: authTokens.refresh
        })
    
        localStorage.setItem('authTokens', JSON.stringify(response.data))
        localStorage.setItem('user', JSON.stringify(response.data))
        setAuthTokens(response.data)
        setUser(decodeToken(response.data.access))
        req.headers.Authorization = `Bearer ${response.data.acess}`
    })

    return axiosInstance
}

export default useAxios