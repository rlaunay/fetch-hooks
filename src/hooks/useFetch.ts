import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ApiContext } from "../context/ApiContext";
import { RequestOptions, UseFetchReturnType, UseLazyFetchReturnType } from "../types";

export function useLazyFetch<T = unknown>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  request?: RequestOptions
): UseLazyFetchReturnType<T> {
  const { endpointUri, headers: baseHeaders, debug } = useContext(ApiContext);
  
  const query = request?.query;
  const options = useMemo(() => ({
    method,
    body: request?.body,
    cache: request?.cache,
    credentials: request?.credentials,
    headers: {
      ...baseHeaders,
      ...request?.headers
    },
    integrity: request?.integrity,
    keepalive: request?.keepalive,
    mode: request?.mode,
    redirect: request?.redirect,
    referrer: request?.referrer,
    referrerPolicy: request?.referrerPolicy,
    signal: request?.signal,
    window: request?.window,
  }), [request, baseHeaders, method])

  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getUrl = useCallback(() => {
    const url = new URL(endpointUri + endpoint);
    const searchParams = new URLSearchParams(query);
    url.search = searchParams.toString();

    return url.toString();
  }, [endpointUri, endpoint, query])

  useEffect(() => {
    if (!debug) return;
    console.log(`${method} - ${endpoint} :`, {
      uri: getUrl(),
      options,
    })
  }, [getUrl, options])

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(getUrl(), options)

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
  }, [options, getUrl])

  return [getData, { loading, error, data }]
}

export function useFetch<T = unknown>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  request?: RequestOptions
): UseFetchReturnType<T> {
  const [getData, { loading, error, data }] = useLazyFetch<T>(endpoint, method, request);

  useEffect(() => {
    getData();
  }, [])

  return { loading, error, data }
}