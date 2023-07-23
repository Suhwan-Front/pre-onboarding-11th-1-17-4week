import { createContext } from 'react'
import { initialSickListContext, type SickListContextProps } from 'types/types'

export const SickContext = createContext<SickListContextProps>(
  initialSickListContext,
)
