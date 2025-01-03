import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://127.0.0.1:8000",
    baseUrl: process.env.REACT_APP_THUNDER_BACKEND_PREFIX,
    credentials: "same-origin",
    mode: "cors",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      const storedTokens = localStorage.getItem("authTokens");
      if (storedTokens) {
        const { tokens } = JSON.parse(storedTokens);
    
        // Decode the access token payload to check expiration
        const accessTokenPayload = JSON.parse(atob(tokens.access.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);
    
        // Check if the access token has expired
        if (accessTokenPayload.exp < currentTime) {
          localStorage.removeItem("authTokens");
        } else {
          headers.set("Authorization", `Bearer ${tokens.access}`);
        }
      }
      return headers;
    },
    responseHandler: async (response) => {
      const data = await response.json();
      return { data, status: response.status };
    },
  }),
  tagTypes: ["Posts", "Postscategory", "Comment", "Resume","Members"],
  endpoints: () => ({}),
});
