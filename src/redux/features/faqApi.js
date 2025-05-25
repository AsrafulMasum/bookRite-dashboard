import { baseApi } from "../api/baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFAQ: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/faq/get",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),

    createFAQ: builder.mutation({
      query: (faq) => ({
        method: "POST",
        url: "/faq",
        body: faq,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
    }),

    updateFAQ: builder.mutation({
      query: ({ id, faq }) => ({
        method: "PUT",
        url: `/faq/update/${id}`,
        body: faq,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
    }),

    deleteFAQ: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/faq/delete/${id}`,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const {
  useGetFAQQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = faqApi;
