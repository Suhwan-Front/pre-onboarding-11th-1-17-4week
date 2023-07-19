import { type ReactNode } from 'react'

export interface HealthData {
  sickCd: string
  sickNm: string
}

export interface HealthListContextProps {
  healthList: HealthData[]
}

export const initialHealthListContext: HealthListContextProps = {
  healthList: [],
}

export interface ListProviderProps {
  children: ReactNode
}
