import { useQuery } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'

const getUserFn = async (axiosBearer: AxiosInstance, id: number) => {
  const response = await axiosBearer.get(`accounts/users/${id}`)
  return response.data
}

export const useUserProfile = (
  axiosBearer: AxiosInstance,
  id: number,
  onSuccess: (data: any) => void,
  onError: (data: any) => void,
) => {
  return useQuery(['user-profile'], () => getUserFn(axiosBearer, id), {
    onSuccess,
    onError,
    staleTime: 5000,
  })
}
