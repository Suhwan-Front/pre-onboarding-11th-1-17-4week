import { axiosClient } from './axiosClient'
import { type SickList } from 'types/types'

export const getHealthList = async (keyword: string): Promise<SickList[]> => {
  const returnValue: SickList[] = []
  try {
    const respone = await axiosClient.get('/sick')
    const data: SickList[] = respone.data
    data.forEach((item) => {
      if (item.sickNm.includes(keyword)) {
        returnValue.push(item)
      }
    })
    console.info('calling API')
    return returnValue
  } catch (error) {
    throw new Error(String(error))
  }
}
