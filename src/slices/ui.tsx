import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { Post, PostCategory } from '../util/type/types'

// interface NavBarState {
//     height: number;
//     selectedTab: number|undefined;
//   }

//   interface State {
//     header: {
//       navBar: NavBarState;
//     };
//   }
const initialState = {
    userInterface: {
        navBar: {
            height: 0,
            selectedTab: 0
        },
        blogFilter: {
            open: false,
            filter: {
                date: 'new',
                ratings: []
            }
        },
        postCategory: {
            data: [] as PostCategory[],
            selectedCategory: {
                id: '',
                name: ''
            } as PostCategory
        },
        postData: {
            data: [] as any,
            selectedPost: {} as Post
        },
        postComments: {
            data: []
        }
    }
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setNavBar: (state, { payload }) => {
            const { height, selectedTab } = payload
            const { navBar } = state.userInterface

            if (height !== undefined) {
                navBar.height = height
            }
            if (selectedTab !== undefined) {
                navBar.selectedTab = selectedTab
            }
            if (selectedTab === -1) {
                navBar.selectedTab = -1
                console.log('-1 tab')
            }
        },
        setBlogFilter: (state, { payload }) => {
            const { open, filter } = payload
            const { blogFilter } = state.userInterface
            if (open !== undefined) {
                blogFilter.open = open
            }
            if (filter !== undefined) {
                blogFilter.filter.date = filter?.date
                blogFilter.filter.ratings = filter?.ratings
            }
        },
        setPostCategory: (state, { payload }) => {
            const { data, selectedCategory } = payload
            const { postCategory } = state.userInterface
            if (data !== undefined) {
                postCategory.data = data
            }
            if (selectedCategory !== undefined) {
                postCategory.selectedCategory = selectedCategory
            }
        },
        setPostData: (state, { payload }) => {
            const { data, selectedPost } = payload
            const { postData } = state.userInterface
            if (data !== undefined) {
                postData.data = data
            }
            if (selectedPost !== undefined) {
                postData.selectedPost = selectedPost
            }
        },
        setPostComments: (state, { payload }) => {
            const { data } = payload
            const { postComments } = state.userInterface
            if (data !== undefined) {
                postComments.data = data
            }
        }
    }
})

// export const {setNavBar,setProgressBar} = uiSlice.actions;
export const { setNavBar, setBlogFilter, setPostData, setPostCategory, setPostComments } = uiSlice.actions;
export default uiSlice.reducer

export const getUiUxState = createSelector(
    (state: RootState) => state.ui.userInterface,
    userInterface => ({ ...userInterface })
);

export { initialState };