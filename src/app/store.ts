import { configureStore } from '@reduxjs/toolkit'
import uiReducer, { initialState }  from '../slices/ui';

const reduxState: string|null = localStorage.getItem('reduxState')
console.log(reduxState)
const persistedState = reduxState ? JSON.parse(reduxState) : initialState;
// console.log(persistedState)
const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
  preloadedState: {
    ui: persistedState
  }
})

store.subscribe(()=>{
  const state = store.getState();
  // console.log(state.ui)
  localStorage.setItem('reduxState',JSON.stringify(state.ui))
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch