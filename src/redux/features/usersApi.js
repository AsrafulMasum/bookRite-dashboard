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
  }),
});
export const { useGetUsersQuery } = usersApi;
