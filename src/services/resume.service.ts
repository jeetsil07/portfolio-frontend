import { api } from "../app/api";

const resumeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getResume: builder.query({
      query: () => ({
        url: "/api/resume/",
        responseHandler: (response) => response.blob(), // Handle binary data as a blob
      }),
      providesTags: ["Resume"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetResumeQuery } = resumeApi;
