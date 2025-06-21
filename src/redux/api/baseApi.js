import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://195.35.9.21:3001/api/v1",
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

export const imageUrl = "http://195.35.9.21:3001";
