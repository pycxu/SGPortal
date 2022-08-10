import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import AuthContext from '../context/AuthContext';
const ResetPassword = () => {
  const [isReset, setIsReset] = useState(false)
  const { baseURL } = useContext(AuthContext)
  const { uidb64, token } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if(isReset) {
        setTimeout(() => {
            navigate('/login')
          }, 2000)
    }
  }, [isReset])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        let response = await axios.post(`${baseURL}/accounts/reset-password/`, {
            uidb64,
            token,
            password: e.target.password.value
        })
        if(response.status === 200) {
            setIsReset(true)

        }
    } catch (error) {
        console.log(error)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
        <input type="password" name="password" placeholder="Reset Password"/>
        <input type="submit" />
    </form>

  )
}

export default ResetPassword