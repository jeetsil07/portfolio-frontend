// import { api } from "../app/api";

// export const postsApi = api.injectEndpoints({
//     endpoints: (builder)=>({
//         getPosts: builder.query({
//             query:({category}) => `/api/posts/${category}`,
//             providesTags: ['Posts']
//         })
//     }),
//     overrideExisting: false
// })
// export const { useGetPostsQuery } = postsApi;
import { api } from '../app/api'

const postsCategoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPostsCategory: builder.query({
      query: () => `/api/postscategory/`,
      providesTags: ['Postscategory'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsCategoryQuery } = postsCategoryApi;
