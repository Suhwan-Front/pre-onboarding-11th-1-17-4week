/* eslint-disable @typescript-eslint/no-empty-function */
import { type Dispatch, type SetStateAction, type ReactNode } from 'react'

export interface HealthData {
  sickCd: string
  sickNm: string
}

export interface HealthListContextProps {
  healthList: HealthData[]
  setSearchQuery: Dispatch<SetStateAction<string>>
  updateHealthList: (data: HealthData[]) => void
}

export const initialHealthListContext: HealthListContextProps = {
  healthList: [],
  setSearchQuery: () => {},
  updateHealthList: function (data: HealthData[]): void {
    throw new Error('Function not implemented.')
  },
}

export interface ListProviderProps {
  children: ReactNode
}
