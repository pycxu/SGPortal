import { useQuery } from '@tanstack/react-query'

const getUserFn = async (axiosBearer, id) => {
  const response = await axiosBearer.get(`accounts/users/${id}`)
  return response.data
}

export const useUserProfile = (axiosBearer, id, onSuccess, onError) => {
  return useQuery(['user-profile'], () => getUserFn(axiosBearer, id), {
    onSuccess,
    onError,
  })
}
