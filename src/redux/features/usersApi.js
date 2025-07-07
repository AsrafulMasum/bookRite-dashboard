import { baseApi } from "../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (srcText) => {
        return {
          url: `/admin/users?search=${srcText}`,
          method: "GET",
        };
      },
    }),

    deleteUser: builder.mutation({
      query: (data) => {
        console.log("from redux", data);
        return {
          method: "DELETE",
          url: `/user/deleteByUser`,
          body: data,
        };
      },
    }),
  }),
});
export const { useGetUsersQuery, useDeleteUserMutation } = usersApi;
