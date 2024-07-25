// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

// const custom = async (path: any)=>{
//     const response = await fetch(path);
//     return response;
// }
// export const api = createApi({
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://127.0.0.1:8000',
//         credentials: 'same-origin',
//         mode: 'cors',
//         fetchFn: custom,
//         prepareHeaders: (headers)=>{
//             headers.set('Accept','application/json');
//             return headers;
//         }
//     }),
//     tagTypes:[
//         'Posts'
//     ],
//     endpoints: ()=>({})
// })

// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000",
    credentials: "same-origin",
    mode: "cors",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
    responseHandler: async (response) => {
      const data = await response.json();
      return { data, status: response.status };
    },
  }),
  tagTypes: ["Posts", "Postscategory"],

  endpoints: () => ({}),
});
