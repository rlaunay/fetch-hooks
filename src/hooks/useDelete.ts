import { useFetch, UseFetchReturnType, useLazyFetch, UseLazyFetchReturnType } from "./useFetch";

export function useDelete<T>(endpoint: string, queryObj?: Record<string, string> | undefined): UseFetchReturnType<T> {
  return useFetch(endpoint, {
    method: 'DELETE'
  }, queryObj);
}
export function useLazyDelete<T>(endpoint: string, queryObj?: Record<string, string> | undefined): UseLazyFetchReturnType<T> {
  return useLazyFetch(endpoint, {
    method: 'DELETE'
  }, queryObj);
}