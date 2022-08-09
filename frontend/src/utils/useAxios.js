import { useContext } from 'react'
import { isExpired, decodeToken } from "react-jwt";
import axios from 'axios'

import AuthContext from '../context/AuthContext'

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL

const useAxios = () => {
    const {authTokens, setUser, setAuthTokens, logoutUser } = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers: {Authorization: `Bearer ${authTokens?.access}`}
    })

    axiosInstance.interceptors.request.use(async req => {
        console.log("is token expired: ", isExpired(authTokens.access))
        if(!isExpired(authTokens.access)) return req
        try {
            const response = await axios.post(`${baseURL}/token/refresh/`, {
                refresh: authTokens.refresh
            })

            if(response.status === 200) {
                localStorage.setItem('authTokens', JSON.stringify(response.data))
                setAuthTokens(response.data)
                setUser(decodeToken(response.data.access))
                req.headers.Authorization = `Bearer ${response.data.access}`
                return req
            }

        } catch (error) {
            logoutUser()
        }
    })

    return axiosInstance
}

export default useAxios