import { baseApi } from "../api/baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanner: builder.query({
      query: () => {
        return {
          url: "/banner",
          method: "GET",
        };
      },
    }),

    updateBanner: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: `/service/${data.id}`,
          body: data?.body,
        };
      },
    }),

    createBanner: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/banner",
          body: data,
        };
      },
    }),

    deleteBanner: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/service/${id}`,
        };
      },
    }),
  }),
});

export const {
  useGetBannerQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useUpdateBannerMutation,
} = bannerApi;
