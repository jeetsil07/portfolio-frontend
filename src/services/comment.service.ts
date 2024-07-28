import { api } from '../app/api'

const postCommentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPostComment: builder.query({
      query: (postId) => {
          return `/api/postcomment/?post_id=${postId}`;        
      },
      providesTags: ['Comment'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostCommentQuery } = postCommentApi;
