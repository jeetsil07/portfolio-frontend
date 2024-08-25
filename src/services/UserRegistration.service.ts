import { api } from '../app/api'

const registrationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (UserData) => ({
        url: '/api/register/',
        method: 'POST',
        body: UserData,
      })
    }),
    updateUser: builder.mutation({
      query: (newUserData) => {
        // Convert body to FormData for multipart handling if necessary
        const formData = new FormData();
        for (const key in newUserData) {
          formData.append(key, newUserData[key]);
        }
        return {
          url: `/api/register/`,
          method: 'PATCH',
          body: formData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterUserMutation, useUpdateUserMutation } = registrationApi;
