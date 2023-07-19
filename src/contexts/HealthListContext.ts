import { createContext } from 'react'
import {
  type HealthListContextProps,
  initialHealthListContext,
} from 'types/types'

export const HealthListContext = createContext<HealthListContextProps>(
  initialHealthListContext,
)
