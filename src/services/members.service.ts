import { api } from "../app/api";

const resumeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: () => ({
        url: "/api/members/",
      }),
      providesTags: ["Members"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMembersQuery } = resumeApi;
