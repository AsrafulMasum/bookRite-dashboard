import { baseApi } from "../api/baseApi";

const statisticsApi = baseApi.injectEndpoints({
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

    userGraphStatistics: builder.query({
      query: (year) => {
        return {
          url: `/booking/userstate?year=${year}`,
          method: "GET",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),

    earningsGraphStatistics: builder.query({
      query: (year) => {
        return {
          url: `/booking/monthlyEarning?year=${year}`,
          method: "GET",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const {
  useStatisticsQuery,
  useUserGraphStatisticsQuery,
  useEarningsGraphStatisticsQuery,
} = statisticsApi;
