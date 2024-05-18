import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

// interface NavBarState {
//     height: number;
//     selectedTab: number|undefined;
//   }
  
//   interface State {
//     header: {
//       navBar: NavBarState;
//     };
//   }
const initialState ={
    userInterface:{
        navBar:{
            height: 0,
            selectedTab: 0
        },
        blogFilter:{
            open: false,
            filter:{
                date: 'new',
                ratings: []
            }
        }
    }
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers:{
        setNavBar:(state, {payload})=>{
            const {height, selectedTab} = payload
            const {navBar} = state.userInterface
            
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
        },
        setBlogFilter:(state,{payload})=>{
            const {open, filter} = payload
            const {blogFilter} = state.userInterface
            if(open !== undefined) {
                blogFilter.open = open
            }
            if(filter !== undefined) {
                blogFilter.filter.date = filter?.date
                blogFilter.filter.ratings = filter?.ratings
            }
        }
    }
})

// export const {setNavBar,setProgressBar} = uiSlice.actions;
export const {setNavBar,setBlogFilter} = uiSlice.actions;
export default uiSlice.reducer

export const getUiUxState = createSelector(
    (state: RootState) => state.ui.userInterface,
    userInterface => ({...userInterface})
  );
  
export {initialState};