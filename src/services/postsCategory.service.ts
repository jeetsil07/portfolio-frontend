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
