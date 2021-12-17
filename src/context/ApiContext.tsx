import React, { createContext } from "react";

export const ApiContext = createContext<{
  endpointUri: string;
  headers: HeadersInit;
  link: (headers: HeadersInit) => HeadersInit;
  debug: boolean;
}>({
  endpointUri: '',
  headers: {},
  link: (_headers: HeadersInit) => ({}),
  debug: false
})

type ClientConfig = {
  uri: string;
  headers?: HeadersInit;
  link?: (headers: HeadersInit) => HeadersInit,
  debug?: boolean
}

class FetchClient {
  private static instance?: FetchClient;

  constructor (readonly config: ClientConfig) { }

  static getInstance(config?: ClientConfig) {
    if (!FetchClient.instance) {
      if (!config) throw new Error('Y a pas de config');
      FetchClient.instance = new FetchClient(config)
    }
    return FetchClient.instance;
  }
}

export function createClient(config: ClientConfig) {
  return FetchClient.getInstance(config);
}

export const FetchProvider: React.FC<{ client: FetchClient }> = ({ children, client }) => {
  const { uri, headers, link, debug } = client.config


  return (
    <ApiContext.Provider
      value={{
        endpointUri: uri,
        headers: headers !== undefined ? headers : {},
        link: link !== undefined ? link : (headers) => headers,
        debug: !!debug 
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}