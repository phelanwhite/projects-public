import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";
import { toast } from "react-toastify";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["authApi"],
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    register: build.mutation({
      query: (data) => ({
        url: `auth/signup`,
        method: "POST",
        body: data,
      }),
      transformResponse(baseQueryReturnValue: any) {
        toast.success(baseQueryReturnValue?.message);
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      invalidatesTags: ["authApi"],
    }),
    login: build.mutation({
      query: (data) => ({
        url: `auth/signin`,
        method: "POST",
        body: data,
      }),
      transformResponse(baseQueryReturnValue: any) {
        toast.success(baseQueryReturnValue?.message);
        return baseQueryReturnValue?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      invalidatesTags: ["authApi"],
    }),
    loggout: build.mutation({
      query: () => ({
        url: `auth/signout`,
        method: "DELETE",
      }),
      transformResponse(baseQueryReturnValue: any) {
        toast.success(baseQueryReturnValue?.message);
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      invalidatesTags: ["authApi"],
    }),
    getMe: build.query({
      query: () => ({
        url: `auth/get-me`,
        method: "GET",
      }),
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      providesTags: ["authApi"],
    }),
    updateMe: build.mutation({
      query: (data) => ({
        url: `auth/update-me`,
        method: "PUT",
        body: data,
      }),
      transformResponse(baseQueryReturnValue: any) {
        toast.success(baseQueryReturnValue?.message);
        return baseQueryReturnValue?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        toast.error(baseQueryReturnValue?.data?.message);
      },
      invalidatesTags: ["authApi"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLoggoutMutation,
  useUpdateMeMutation,
  useGetMeQuery,
} = authApi;
