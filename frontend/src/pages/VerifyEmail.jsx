import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import AuthContext from '../context/AuthContext';
const VerifyEmail = () => {
  const [isVerified, setIsVerified] = useState(false)
  const { baseURL } = useContext(AuthContext)
  const { uidb64, token } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    verifyEmail(baseURL, uidb64, token)
  }, [uidb64, token])

  useEffect(() => {
    setTimeout(() => {
        navigate('/login')
      }, 2000)
  }, [isVerified])

  const verifyEmail = async (baseURL, uidb64, token) => {
    try {
        let response = await axios.post(`${baseURL}/accounts/verify-email/`, {
            uidb64,
            token
        })
        if(response.status === 200) {
            setIsVerified(true)

        }
    } catch (error) {
        console.log(error)
    }
  }
  
  if(!isVerified) return <p>Loading...</p>

  return (
    <>
        {isVerified && <div>Verified! Redirecting to login page...</div>}
    </>
  )
}

export default VerifyEmail