import { baseApi } from "../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => {
        return {
          url: "/admin/users",
          method: "GET",
        };
      },
      transformResponse: ({ data }) => {
        return data?.data;
      },
    }),
  }),
});
export const { useGetUsersQuery } = usersApi;
