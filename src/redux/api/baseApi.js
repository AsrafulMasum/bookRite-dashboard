import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.0.70.208:3001/api/v1",
    // baseUrl: "http://192.168.10.195:5000/api"
  }),
  endpoints: () => ({}),
});

// export const imageUrl = "http://206.189.231.81:5000";
export const imageUrl = "http://206.189.231.81:5000";
 