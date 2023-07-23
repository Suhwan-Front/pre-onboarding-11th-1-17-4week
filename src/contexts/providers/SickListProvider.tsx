/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import {
  type SickListProviderProps,
  type SickList,
  type SystemError,
} from 'types/types'
import { getHealthList } from 'utils/apiUtils'
import { SickContext } from 'contexts/SickListContext'

export function SickAPIProvider({ children }: SickListProviderProps) {
  const [searchSickList, setSearchSickList] = useState<SickList[]>([])
  const [fetchError, setFetchError] = useState<string | null>(null)
  const fetchSickList = async (value: string) => {
    try {
      const now = new Date()
      if (localStorage.getItem(value) != null) {
        const localFetchSickList = localStorage.getItem(value)
        const getItem = JSON.parse(localFetchSickList ?? '[]')
        if (now.getTime() > getItem.expire) {
          localStorage.removeItem(value)
          const newFetchSickList = await getHealthList(value)
          const setItem = {
            value,
            newFetchSickList,
            expire: now.getTime() + 300000,
          }
          localStorage.setItem(value, JSON.stringify(setItem))
        } else {
          setSearchSickList([...getItem.newFetchSickList])
        }
      } else {
        const newFetchSickList = await getHealthList(value)
        const setItem = {
          value,
          newFetchSickList,
          expire: now.getTime() + 300000,
        }
        localStorage.setItem(value, JSON.stringify(setItem))
        setSearchSickList([...newFetchSickList])
      }
    } catch (error) {
      const err = error as SystemError
      setFetchError(err.message)
    }
  }
  return (
    <SickContext.Provider value={{ searchSickList, fetchError, fetchSickList }}>
      {children}
    </SickContext.Provider>
  )
}
