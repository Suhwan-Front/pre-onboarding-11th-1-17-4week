import { combineReducers, createStore } from 'redux'
import { queryReducer } from './List'

const rootReducer = combineReducers({
  queryReducer,
})

export const store = createStore(rootReducer)
