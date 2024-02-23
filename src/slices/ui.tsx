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
    uiux:{
        navBar:{
            height: 0,
            selectedTab: 0
        },
        progressBar:{
            options: []
        }
    }
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers:{
        setNavBar:(state, {payload})=>{
            const {height, selectedTab} = payload
            const {navBar} = state.uiux
            
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
        setProgressBar: (state,{payload})=>{
            const {options} = payload
            const {progressBar} = state.uiux

            if(options !== undefined){
                progressBar.options = options
            }
        }
    }
})

export const {setNavBar,setProgressBar} = uiSlice.actions;
export default uiSlice.reducer

export const getUiUxState = createSelector(
    (state: RootState) => state.ui.uiux,
    uiux => ({...uiux})
  );
  
export {initialState};