import { combineReducers, createStore } from 'redux'
import SearchSickListReducer from './SearchSickListReducer'

const rootReducer = combineReducers({
  SearchSickList: SearchSickListReducer,
})

export const store = createStore(rootReducer)
