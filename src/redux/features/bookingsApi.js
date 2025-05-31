import { baseApi } from "../api/baseApi";

const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: (srcText) => {
        return {
          method: "GET",
          url: `/booking/getAllBookings?search=${srcText}`,
        };
      },
    }),
  }),
});

export const { useGetBookingsQuery } = bookingsApi;
