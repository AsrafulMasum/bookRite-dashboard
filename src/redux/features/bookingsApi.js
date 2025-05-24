import { baseApi } from "../api/baseApi";

const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/booking/getAllBookings",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const { useGetBookingsQuery } = bookingsApi;
