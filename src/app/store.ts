import { configureStore } from '@reduxjs/toolkit'
import uiReducer, { initialState as uiInitialState } from '../slices/ui';
import userReducer, { initialState as userInitialState } from '../slices/user';

import { api } from './api';

const pathName = window.location.pathname;
const reduxState: string|null = (pathName === '/home') || (pathName === '/') ? null : localStorage.getItem('reduxState');
const userState: string|null = (pathName === '/home') || (pathName === '/') ? null : localStorage.getItem('userState');

const uiPersistedState = reduxState ? JSON.parse(reduxState) : uiInitialState;
const userPersistedState = userState ? JSON.parse(userState) : userInitialState;

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    ui: uiReducer,
    user: userReducer,
  },
  preloadedState: {
    ui: uiPersistedState,
    user: userPersistedState
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

store.subscribe(()=>{
  const state = store.getState();
  localStorage.setItem('reduxState',JSON.stringify(state.ui))
  localStorage.setItem('userState',JSON.stringify(state.user))
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch