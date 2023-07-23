/* eslint-disable @typescript-eslint/no-empty-function */
import { type Dispatch, type SetStateAction, type ReactNode } from 'react'

export interface SickList {
  sickCd: string
  sickNm: string
}

export interface SickListContextProps {
  searchSickList: SickList[]
  fetchError: string | null
  fetchSickList: (value: string) => Promise<void>
}

export const initialSickListContext: SickListContextProps = {
  searchSickList: [],
  fetchError: null,
  fetchSickList: async () => {},
}

export interface SystemError {
  code: string
  message: string
}

export interface SickListProviderProps {
  children: ReactNode
}

export interface reducerType {
  state: string
  [x: string]: string
  action: string
  value: string
}
