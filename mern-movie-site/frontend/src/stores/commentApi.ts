import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";
import { toast } from "react-toastify";

export const commentApi = createApi({
  reducerPath: "commentApi",
  tagTypes: ["commentApi"],
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    addComment: build.mutation({
      query: (data) => ({
        url: `comment`,
        method: "POST",
        body: data,
      }),
      transformResponse(baseQueryReturnValue: any) {
        toast.success(baseQueryReturnValue?.message);
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      invalidatesTags: ["commentApi"],
    }),
    removeComment: build.mutation({
      query: (id) => ({
        url: `comment/${id}`,
        method: "DELETE",
      }),
      transformResponse(baseQueryReturnValue: any) {
        toast.success(baseQueryReturnValue?.message);
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      invalidatesTags: ["commentApi"],
    }),
    getComment: build.query({
      query: (parameter) => ({
        url: `comment?${parameter}`,
        method: "GET",
      }),
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      providesTags: ["commentApi"],
    }),
  }),
});

export const {
  useAddCommentMutation,
  useGetCommentQuery,
  useRemoveCommentMutation,
} = commentApi;
