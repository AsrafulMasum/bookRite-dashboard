import { baseApi } from "../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/service",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),

    updateCategory: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: `/service/${data.id}`,
          body: data?.body,
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),

    createCategory: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/service/create-service",
          body: data,
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),

    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/service/${id}`,
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
