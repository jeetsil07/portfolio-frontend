import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000",
    credentials: "same-origin",
    mode: "cors",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      const storedTokens = localStorage.getItem("authTokens");
      if (storedTokens) {
        const { tokens } = JSON.parse(storedTokens);
        headers.set("Authorization", `Bearer ${tokens.access}`);
      }
      return headers;
    },
    responseHandler: async (response) => {
      const data = await response.json();
      return { data, status: response.status };
    },
  }),
  tagTypes: ["Posts", "Postscategory", "Comment", "Resume"],
  endpoints: () => ({}),
});
