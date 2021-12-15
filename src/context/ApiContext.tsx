import React, { createContext } from "react";

export const ApiContext = createContext<{
  endpointUri: string;
  headers: HeadersInit;
  link: (headers: HeadersInit) => HeadersInit
}>({
  endpointUri: '',
  headers: {},
  link: (_headers: HeadersInit) => ({}),
})

export class FetchClient {
  constructor (readonly config: {
    uri: string;
    headers?: HeadersInit;
    link?: (headers: HeadersInit) => HeadersInit 
  }) { }
}

export const FetchProvider: React.FC<{ client: FetchClient }> = ({ children, client }) => {
  const { uri, headers, link } = client.config


  return (
    <ApiContext.Provider
      value={{
        endpointUri: uri,
        headers: headers !== undefined ? headers : {},
        link: link !== undefined ? link : (headers) => headers 
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}