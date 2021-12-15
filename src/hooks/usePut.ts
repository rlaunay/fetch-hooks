import { BodyRequest, useFetch, UseFetchReturnType, useLazyFetch, UseLazyFetchReturnType } from "./useFetch";

export function usePut<T>(endpoint: string, body?: BodyRequest | null, queryObj?: Record<string, string> | undefined): UseFetchReturnType<T> {
  return useFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body)
  }, queryObj);
}
export function useLazyPut<T>(endpoint: string, body?: BodyRequest | null, queryObj?: Record<string, string> | undefined): UseLazyFetchReturnType<T> {
  return useLazyFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body)
  }, queryObj);
}