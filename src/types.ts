export type UseFetchReturnType<T = unknown> = {
  loading: boolean;
  error: undefined | null | unknown;
  data: T | undefined
}

export type UseLazyFetchReturnType<T> = [
  () => Promise<void>,
  UseFetchReturnType<T>
]

export type RequestOptions = {
  body?: BodyInit | null;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  integrity?: string;
  keepalive?: boolean;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  signal?: AbortSignal | null;
  window?: null;
  query?: Record<string, string>
}

export type ApiContextType = {
  endpointUri: string;
  headers: HeadersInit;
  debug: boolean
}

export type ClientConfig = {
  uri: string;
  headers?: HeadersInit;
  debug?: boolean
}