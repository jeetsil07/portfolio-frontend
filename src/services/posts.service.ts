import { api } from "../app/api";

const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (category) => {
        console.log('category api',category)
        if (category.id === "" || category === "") {
          return "/api/posts/";
        } else {
          return `/api/posts/?category_id=${category.id}`;
        }
      },
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation({
      query: (postData) => {
        // Convert body to FormData for multipart handling if necessary
        const formData = new FormData();
        for (const key in postData) {
          formData.append(key, postData[key]);
        }
        return {
          url: "/api/posts/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ['Posts'],
    }),
    updatePost: builder.mutation({
      query: (updatePostData) => {
        // Convert body to FormData for multipart handling if necessary
        const formData = new FormData();
        for (const key in updatePostData) {
          formData.append(key, updatePostData[key]);
        }
        return {
          url: `/api/posts/${updatePostData.id}/`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation({
      query: (postId) => {
        // Convert body to FormData for multipart handling if necessary
        return {
          url: `/api/posts/${postId}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['Posts'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } = postsApi;
