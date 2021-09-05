import petReducer from './pet/reducer'
import accountReducer from './account/reducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  pets: petReducer,
  account: accountReducer,
})

export type RootState = ReturnType<typeof rootReducer>
