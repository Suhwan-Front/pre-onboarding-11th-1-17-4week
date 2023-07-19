import { axiosClient } from './axiosClient'
import { type HealthData } from 'types/types'

export const getHealthList = async (): Promise<HealthData[]> => {
  try {
    const respone = await axiosClient.get('/sick')
    return respone.data as HealthData[]
  } catch (error) {
    throw new Error(String(error))
  }
}
