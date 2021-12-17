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

export class FetchClient {
  constructor (readonly config: {
    uri: string;
    headers?: HeadersInit;
    link?: (headers: HeadersInit) => HeadersInit,
    debug?: boolean
  }) { }
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