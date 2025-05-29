import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user/profile",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),

    otpVerify: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/verify-email",
          body: data,
        };
      },
    }),

    login: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/login",
          body: data,
        };
      },
      transformResponse: (data) => {
        return data;
      },
      transformErrorResponse: ({ data }) => {
        const { message } = data;
        return message;
      },
    }),

    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/forgot-password",
          body: data,
        };
      },
    }),

    resetPassword: builder.mutation({
      query: ({payload, token}) => {
        console.log(payload)
        return {
          method: "POST",
          url: "/auth/reset-password",
          body: payload,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    changePassword: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/change-password",
          body: data,
        };
      },
    }),

    updateProfile: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/user",
          body: data,
        };
      },
    }),

    resendOTP: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/user/resend-otp",
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
  useOtpVerifyMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useProfileQuery,
  useResendOTPMutation,
} = authApi;
