import { type reducerType } from 'types/types'

const QUERY = 'list/Query'

export function searchQuery() {
  return { type: QUERY }
}

const QUERY_INITIAL_STATE = ''

export function queryReducer(
  state: any = QUERY_INITIAL_STATE,
  action: reducerType,
) {
  if (action.type === QUERY) {
    return state
  }

  return state
}
