import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

interface NavBarState {
    height: number;
    selectedTab: number|undefined;
  }
  
  interface State {
    header: {
      navBar: NavBarState;
    };
  }
const initialState:State ={
    header:{
        navBar:{
            height: 0,
            selectedTab: 0
        }
    }
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers:{
        setNavBar:(state, {payload})=>{
            const {height, selectedTab} = payload
            const {navBar} = state.header
            
            if(height !== undefined) {
                navBar.height = height
            }
            if(selectedTab !== undefined) {
                navBar.selectedTab = selectedTab
            }
            if(selectedTab === -1) {
                navBar.selectedTab = -1
                console.log('-1 tab')
            }
        }
    }
})

export const {setNavBar} = uiSlice.actions;
export default uiSlice.reducer

export const getNavBarState = createSelector(
    (state: RootState) => state.ui.header,
    header=> ({...header})
)
export {initialState};