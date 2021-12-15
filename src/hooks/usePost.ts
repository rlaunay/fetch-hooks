import { BodyRequest, useFetch, UseFetchReturnType, useLazyFetch, UseLazyFetchReturnType } from "./useFetch";

export function usePost<T>(endpoint: string, body?: BodyRequest | null, queryObj?: Record<string, string> | undefined): UseFetchReturnType<T> {
  return useFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(body)
  }, queryObj);
}
export function useLazyPost<T>(endpoint: string, body?: BodyRequest | null, queryObj?: Record<string, string> | undefined): UseLazyFetchReturnType<T> {
  return useLazyFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(body)
  }, queryObj);
}