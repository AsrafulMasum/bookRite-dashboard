import { baseApi } from "../api/baseApi";

const homeSlice = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        summary: builder.query({
            query: ()=> {
                return{
                    url: `/order`,
                    method: "GET",
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                }
            }
        }),
    })
})

export const {
    useSummaryQuery
} = homeSlice;