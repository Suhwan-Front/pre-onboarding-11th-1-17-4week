/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState, useEffect } from 'react'
import { type ListProviderProps, type HealthData } from 'types/types'
import { getHealthList } from 'utils/apiUtils'
import { HealthListContext } from 'contexts/HealthListContext'

export const HealthListProvider = ({ children }: ListProviderProps) => {
  const [healthList, setHealthList] = useState<HealthData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHealthList()
      setHealthList(data)
    }
    fetchData()
  }, [])
  return (
    <HealthListContext.Provider value={{ healthList }}>
      {children}
    </HealthListContext.Provider>
  )
}
