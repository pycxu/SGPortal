import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../common/contexts/AuthContext'
import useAxios from '../../hooks/useAxios'

export default function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user, logoutUser } = useContext(AuthContext)

  const api = useAxios()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      const response = await api.get(`accounts/users/${user.user_id}`)
      console.log('profile res', response)
      if (response.status === 200) {
        setProfile(response.data)
        setLoading(false)
      }
    } catch (error) {
      logoutUser()
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <>
      <div>Dashboard</div>
      <p>hi {profile.username}</p>
    </>
  )
}
