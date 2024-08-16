import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

const initialState = {
    userData:{
        user:{
            user_id: '',
            is_superuser: false,
            email: '',
            first_name: '',
            last_name: ''
        }        
    }
}

const uiSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state,{payload})=>{
            const {user_id,is_superuser,email,first_name,last_name} = payload
            const {user} = state.userData
            if(user_id !== undefined){
                user.user_id = user_id
            }if(is_superuser !== undefined){
                user.is_superuser = is_superuser
            }
            if(email !== undefined){
                user.email = email
            }
            if(first_name !== undefined){
                user.first_name = first_name
            }
            if(last_name !== undefined){
                user.last_name = last_name
            }
        }
    }
})

export const {setUserData} = uiSlice.actions;
export default uiSlice.reducer

export const getUserData = createSelector(
    (state: RootState) => state.user.userData,
    userData => ({ ...userData })
);

export { initialState };