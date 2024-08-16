import { api } from '../app/api'

const registrationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (UserData) => ({
        url: '/api/register/',
        method: 'POST',
        body: UserData,
      })
    })
  }),
  overrideExisting: false,
});

export const { useRegisterUserMutation } = registrationApi;
