/* eslint-disable @typescript-eslint/no-empty-function */
import { type Dispatch, type SetStateAction, type ReactNode } from 'react'

export interface HealthData {
  sickCd: string
  sickNm: string
}

export interface HealthListContextProps {
  healthList: HealthData[]
  setSearchQuery: Dispatch<SetStateAction<string>>
}

export const initialHealthListContext: HealthListContextProps = {
  healthList: [],
  setSearchQuery: () => {},
}

export interface ListProviderProps {
  children: ReactNode
}
