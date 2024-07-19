import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

export type BaseQueryFn<
  Args = any,
  Result = unknown,
  Error = unknown,
  DefinitionExtraOptions = any,
  Meta = any
> = (
  args: Args,
  api: BaseQueryApi,
  extraOptions: DefinitionExtraOptions
) => Promise<QueryReturnValue<Result, Error, Meta>>;

export interface BaseQueryApi {
  signal: AbortSignal;
  dispatch: ThunkDispatch<any, any, any>;
  getState: () => unknown;
}

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E;
      data?: undefined;
      meta?: M;
    }
  | {
      error?: undefined;
      data: T;
      meta?: M;
    };

const baseQuery = fetchBaseQuery({
  // baseUrl: `http://localhost:5000/api/`,
  baseUrl: `/api/`,
  credentials: "include",
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const baseQueryWithAuth: BaseQueryFn<
  any,
  unknown,
  FetchBaseQueryError,
  any,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api as any, extraOptions);

  if (result.error?.status === 403 || result.error?.status === 401) {
    window.location.replace(`/login`);
    // console.log(result);
  }

  return result;
};
