/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import { type ListProviderProps, type HealthData } from 'types/types'
import { getHealthList } from 'utils/apiUtils'
import { HealthListContext } from 'contexts/HealthListContext'
import { MAX_RELATED_SEARCHES } from 'components/constants/const'

export const HealthListProvider = ({ children }: ListProviderProps) => {
  const [healthList, setHealthList] = useState<HealthData[]>([])
  const [filteredHealthList, setFilteredHealthList] = useState<HealthData[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery !== '') {
          console.info('관련 데이터를 가져옵니다.')
          const data = await getHealthList()
          const filteredData = data.filter((sick) =>
            sick.sickNm.includes(searchQuery),
          )
          console.log(filteredData)
          setHealthList(filteredData)
        }
      } catch (error) {
        console.error('API 호출 실패:', error)
      }
    }
    fetchData()
  }, [searchQuery])

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredHealthList(healthList.slice(0, MAX_RELATED_SEARCHES))
    } else {
      const filteredData = healthList.filter((sick) =>
        sick.sickNm.includes(searchQuery),
      )
      setFilteredHealthList(filteredData.slice(0, MAX_RELATED_SEARCHES))
    }
  }, [healthList, searchQuery])

  return (
    <HealthListContext.Provider
      value={{ healthList: filteredHealthList, setSearchQuery }}
    >
      {children}
    </HealthListContext.Provider>
  )
}
