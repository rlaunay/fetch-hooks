import { useCallback, useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/ApiContext";


export type BodyRequest = any

type ErrorResponse = unknown

export type UseFetchReturnType<T = unknown> = {
  loading: boolean;
  error: undefined | null | ErrorResponse;
  data: T | undefined
}

export type UseLazyFetchReturnType<T> = [
  () => Promise<void>,
  UseFetchReturnType<T>
]

export function useLazyFetch<T = unknown>(endpoint: string, options: RequestInit, queryObj?: Record<string, string> | undefined): UseLazyFetchReturnType<T> {
  const { endpointUri, headers, link, debug } = useContext(ApiContext);

  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getUrl = useCallback(() => {
    const url = new URL(endpointUri + endpoint);
    const query = new URLSearchParams(queryObj);
    url.search = query.toString();

    return url.toString();
  }, [endpointUri, endpoint, queryObj])

  useEffect(() => {
    if (!debug) return;
    console.log(`${options.method} - ${endpoint} :`, {
      uri: getUrl(),
      options: {
        headers: link(headers),
        ...options
      }
    })
  }, [getUrl, headers, options])

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(getUrl(), {
        headers: link(headers),
        ...options
      })

      const result = res.status !== 204 ? await res.json() : null;

      if (!res.ok) {
        return setError(result);
      }

      setData(result);
    } catch (error) {
      setError(error);
      if (debug) {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }, [headers, options, getUrl])

  return [getData, { loading, error, data }]
}

export function useFetch<T = unknown>(endpoint: string, option: RequestInit, queryObj?: Record<string, string> | undefined): UseFetchReturnType<T> {
  const [getData, { loading, error, data }] = useLazyFetch<T>(endpoint, option, queryObj);

  useEffect(() => {
    getData();
  }, [])

  return { loading, error, data }
}