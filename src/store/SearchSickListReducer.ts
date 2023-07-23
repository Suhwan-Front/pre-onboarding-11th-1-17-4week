import { type SickList } from 'types/types'

const initialState: SickList[] = []

const SearchSickListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SEARCH_SICK_LIST':
      return action.payload
    default:
      return state
  }
}

export default SearchSickListReducer
