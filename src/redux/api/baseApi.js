import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.flxbookonline.com/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined") {
        headers.set("Authorization", `Bearer ${JSON.parse(token)}`)
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const imageUrl = "https://api.flxbookonline.com";
