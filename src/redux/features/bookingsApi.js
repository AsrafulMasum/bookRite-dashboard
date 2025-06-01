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
    }),
  }),
});

export const { useGetBookingsQuery } = bookingsApi;
