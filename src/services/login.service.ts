import { api } from '../app/api'

const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: '/api/login/',
        method: 'POST',
        body: loginData,
      })
    })
  }),
  overrideExisting: false,
});

export const { useLoginUserMutation } = loginApi;
