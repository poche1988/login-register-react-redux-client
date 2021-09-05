import accountReducer from './account/reducer'

//use combine reducer when you have multiple stores
export type RootState = ReturnType<typeof accountReducer>
