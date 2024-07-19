import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";
import { toast } from "react-toastify";

export const myListApi = createApi({
  reducerPath: "myListApi",
  tagTypes: ["myListApi"],
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    createMyList: build.mutation({
      query: (data) => ({
        url: `my-list`,
        method: "POST",
        body: data,
      }),
      transformResponse(baseQueryReturnValue: any) {
        toast.success(baseQueryReturnValue?.message);
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      invalidatesTags: ["myListApi"],
    }),
    updateMyList: build.mutation({
      query: ({ id, data }) => ({
        url: `my-list/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse(baseQueryReturnValue: any) {
        toast.success(baseQueryReturnValue?.message);
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      invalidatesTags: ["myListApi"],
    }),
    deleteMyList: build.mutation({
      query: (id) => ({
        url: `my-list/${id}`,
        method: "DELETE",
      }),
      transformResponse(baseQueryReturnValue: any) {
        toast.success(baseQueryReturnValue?.message);
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      invalidatesTags: ["myListApi"],
    }),
    getmyList: build.query({
      query: () => ({
        url: `my-list`,
        method: "GET",
      }),
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      providesTags: ["myListApi"],
    }),
    getmyListId: build.query({
      query: (id) => ({
        url: `my-list/${id}`,
        method: "GET",
      }),
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      providesTags: ["myListApi"],
    }),
    addItemToMyList: build.mutation({
      query: ({ id, data }) => ({
        url: `my-list/${id}/add-item`,
        method: "PUT",
        body: data,
      }),
      transformResponse(baseQueryReturnValue: any) {
        toast.success(baseQueryReturnValue?.message);
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      invalidatesTags: ["myListApi"],
    }),
    removeItemFromMyList: build.mutation({
      query: ({ id, itemId, itemType }) => ({
        url: `my-list/${id}/remove-item?itemId=${itemId}&itemType=${itemType}`,
        method: "DELETE",
      }),
      transformResponse(baseQueryReturnValue: any) {
        toast.success(baseQueryReturnValue?.message);
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      invalidatesTags: ["myListApi"],
    }),
  }),
});

export const {
  useCreateMyListMutation,
  useDeleteMyListMutation,
  useGetmyListQuery,
  useAddItemToMyListMutation,
  useRemoveItemFromMyListMutation,
  useGetmyListIdQuery,
  useUpdateMyListMutation,
} = myListApi;
