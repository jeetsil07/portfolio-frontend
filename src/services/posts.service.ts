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

const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (category) => {
        if (category.id === '') {
          return '/api/posts/';
        } else {
          return `/api/posts/?category_id=${category.id}`;
        }
      },
      providesTags: ['Posts'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery } = postsApi;
