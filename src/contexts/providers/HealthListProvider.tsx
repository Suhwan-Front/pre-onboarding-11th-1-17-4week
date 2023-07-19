/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from 'react'
import { type ListProviderProps, type HealthData } from 'types/types'
import { getHealthList } from 'utils/apiUtils'
import { HealthListContext } from 'contexts/HealthListContext'
import { MAX_RELATED_SEARCHES } from 'components/constants/const'

export const HealthListProvider = ({ children }: ListProviderProps) => {
  const [healthList, setHealthList] = useState<HealthData[]>([])
  const [filteredHealthList, setFilteredHealthList] = useState<HealthData[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const cachedSearchQueries = useRef<string[]>([])
  const cachedData = useRef<Record<string, HealthData[]>>({})

  useEffect(() => {
    const cachedDataJSON = localStorage.getItem('cachedData')
    if (cachedDataJSON) {
      const parsedData = JSON.parse(cachedDataJSON)
      cachedData.current = parsedData.data
      cachedSearchQueries.current = parsedData.searchQueries
    }

    const fetchData = async () => {
      try {
        if (searchQuery !== '') {
          console.info('calling api')
          if (cachedSearchQueries.current.includes(searchQuery)) {
            setHealthList(cachedData.current[searchQuery])
          } else {
            const data = await getHealthList()
            const filteredData = data.filter((sick) =>
              sick.sickNm.includes(searchQuery),
            )
            console.log(filteredData)
            setHealthList(filteredData)

            cachedSearchQueries.current.push(searchQuery)
            cachedData.current[searchQuery] = filteredData

            // 로컬 스토리지에 캐싱된 데이터를 저장
            localStorage.setItem(
              'cachedData',
              JSON.stringify({
                data: cachedData.current,
                searchQueries: cachedSearchQueries.current,
              }),
            )
          }
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

  const updateHealthList = (data: HealthData[]) => {
    setHealthList(data)
  }

  return (
    <HealthListContext.Provider
      value={{
        healthList: filteredHealthList,
        setSearchQuery,
        updateHealthList,
      }}
    >
      {children}
    </HealthListContext.Provider>
  )
}
