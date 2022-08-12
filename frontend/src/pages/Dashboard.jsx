import React, {useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext'

import useAxios from '../utils/useAxios'

const Dashboard = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user, logoutUser } = useContext(AuthContext)
 
  const api = useAxios()

  useEffect(() => {
    getProfile()
  }, [])

  let getProfile = async () => {
    try {
        let response = await api.get(`accounts/users/${user.user_id}`)
        console.log('profile res', response);
        if(response.status === 200) {
            console.log('dashboard res', response.data.username)
            setProfile(response.data)
            setLoading(false)
        }
    } catch (error) {
        logoutUser()
    }

  }

  if(loading) return <p>Loading...</p>

  return (
    <><div>Dashboard</div><p>hi {profile.username}</p></>

  )
}

export default Dashboard