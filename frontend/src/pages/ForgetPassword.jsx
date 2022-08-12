import { useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'

const ForgetPassword = () => {
  const [isSent, setIsSent] = useState(false)
  const { baseURL } = useContext(AuthContext)
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        let response = await axios.post(`${baseURL}/accounts/forget-password/`, {
            email: e.target.email.value
        })
        if(response.status === 200) {
            setIsSent(true)
        }
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <>
        {isSent ? <p>Sent reset link</p> 
        :<form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" />
            <input type="submit" />
        </form>}
    </>    
  )
}

export default ForgetPassword