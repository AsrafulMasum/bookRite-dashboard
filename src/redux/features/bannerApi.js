import { baseApi } from "../api/baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    statistics: builder.query({
      query: () => {
        return {
          url: "/booking/total-service",
          method: "GET",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),

    userStatistics: builder.query({
      query: () => {
        return {
          url: "/user",
          method: "GET",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const { useStatisticsQuery } = bannerApi;
