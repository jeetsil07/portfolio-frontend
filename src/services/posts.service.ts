import { api } from "../app/api";

const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (category) => {
        if (category.id === "") {
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
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery, useCreatePostMutation } = postsApi;
