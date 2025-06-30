import { baseApi } from "../api/baseApi";

const rulesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/rule/about",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),

    createAboutUs: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/rule/about",
          body: data,
        };
      },
      transformResponse: (data) => {
        return data;
      },
    }),

    updateAboutUs: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/rule/about",
          body: data,
        };
      },
      transformResponse: (data) => {
        return data;
      },
    }),

    getPrivacyPolicy: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/rule/privacy-policy",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),

    createPrivacyPolicy: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/rule/privacy-policy",
          body: data,
        };
      },
      transformResponse: (data) => {
        return data;
      },
    }),

    updatePrivacyPolicy: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/rule/privacy-policy",
          body: data,
        };
      },
      transformResponse: (data) => {
        return data;
      },
    }),

    getTermsCondition: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/rule/terms-and-conditions",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),

    createTermsCondition: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/rule/terms-and-conditions",
          body: data,
        };
      },
      transformResponse: (data) => {
        return data;
      },
    }),

    updateTermsCondition: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/rule/terms-and-conditions",
          body: data,
        };
      },
      transformResponse: (data) => {
        return data;
      },
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useCreateAboutUsMutation,
  useUpdateAboutUsMutation,
  useGetPrivacyPolicyQuery,
  useCreatePrivacyPolicyMutation,
  useUpdatePrivacyPolicyMutation,
  useGetTermsConditionQuery,
  useCreateTermsConditionMutation,
  useUpdateTermsConditionMutation,
} = rulesApi;
