import { api } from '../app/api'

const postCommentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPostComment: builder.query({
      query: (postId) => {
          return `/api/postcomment/?post_id=${postId}`;        
      },
      providesTags: ['Comment'],
    }),
    createPostComment: builder.mutation({
      query: (newCommentData) => ({
        url: '/api/postcomment/',
        method: 'POST',
        body: newCommentData,
      }),
      invalidatesTags: ['Comment'],
    }),
    updatePostComment: builder.mutation({
      query: (updatedCommentData) => {
        return {
          url: `/api/postcomment/${updatedCommentData.comment_id}/`,
          method: 'PATCH',
          body: updatedCommentData,
        }        
      },
      invalidatesTags: ['Comment'],
    }),
    deletePostComment: builder.mutation({
      query: (commentId) => ({
        url: `/api/postcomment/${commentId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostCommentQuery, useCreatePostCommentMutation, useUpdatePostCommentMutation, useDeletePostCommentMutation } = postCommentApi;
