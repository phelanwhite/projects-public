import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";
import { toast } from "react-toastify";

export const favoriteApi = createApi({
  reducerPath: "favoriteApi",
  tagTypes: ["favoriteApi"],
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    addFavorite: build.mutation({
      query: (data) => ({
        url: `my-favourite`,
        method: "POST",
        body: data,
      }),
      transformResponse(baseQueryReturnValue: any) {
        toast.success(baseQueryReturnValue?.message);
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      invalidatesTags: ["favoriteApi"],
    }),
    removeFavorite: build.mutation({
      query: (id) => ({
        url: `my-favourite/${id}`,
        method: "DELETE",
      }),
      transformResponse(baseQueryReturnValue: any) {
        toast.success(baseQueryReturnValue?.message);
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      invalidatesTags: ["favoriteApi"],
    }),
    getFavorite: build.query({
      query: () => ({
        url: `my-favourite`,
        method: "GET",
      }),
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      providesTags: ["favoriteApi"],
    }),
  }),
});

export const {
  useAddFavoriteMutation,
  useGetFavoriteQuery,
  useRemoveFavoriteMutation,
} = favoriteApi;
