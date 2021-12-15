import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/ApiContext";


export type BodyRequest = {
  [key: string]: string | null | undefined | boolean | number | BodyRequest
}

export type UseFetchReturnType<T = unknown> = {
  loading: boolean;
  error: undefined | null | string;
  data: T | undefined
}

export type UseLazyFetchReturnType<T> = [
  () => Promise<void>,
  UseFetchReturnType<T>
]

export function useLazyFetch<T = unknown>(endpoint: string, options: RequestInit, queryObj?: Record<string, string> | undefined): UseLazyFetchReturnType<T> {
  const { endpointUri, headers } = useContext(ApiContext);

  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getUrl = () => {
    const url = new URL(endpointUri + endpoint);
    const query = new URLSearchParams(queryObj);
    url.search = query.toString();

    return url.toString();
  }

  console.log({
    uri: getUrl(),
    options: {
      headers: {
        ...headers
      },
      ...options
    }
  })

  const getData = async () => {
    setLoading(true);
    try {
      const res = await fetch(getUrl(), {
        headers: {
          ...headers
        },
        ...options
      })

      const result = res.status !== 204 ? await res.json() : null;

      if (!res.ok) {
        return setError(result?.message || 'Une erreur est survenue');
      }

      setData(result);
    } catch (error) {
      setError(error?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  return [getData, { loading, error, data }]
}

export function useFetch<T = unknown>(endpoint: string, option: RequestInit, queryObj?: Record<string, string> | undefined): UseFetchReturnType<T> {
  const [getData, { loading, error, data }] = useLazyFetch<T>(endpoint, option, queryObj);

  useEffect(() => {
    getData();
  }, [])

  return { loading, error, data }
}