import { useFetch, UseFetchReturnType, useLazyFetch, UseLazyFetchReturnType } from "./useFetch";


export function useGet<T>(endpoint: string, queryObj?: Record<string, string> | undefined): UseFetchReturnType<T> {
  return useFetch(endpoint, {
    method: 'GET'
  }, queryObj);
}
export function useLazyGet<T>(endpoint: string, queryObj?: Record<string, string> | undefined): UseLazyFetchReturnType<T> {
  return useLazyFetch(endpoint, {
    method: 'GET'
  }, queryObj);
}