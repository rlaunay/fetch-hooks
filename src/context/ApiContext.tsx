import React, { createContext } from "react";

export const ApiContext = createContext<{
  endpointUri: string;
  headers: HeadersInit;
}>({
  endpointUri: '',
  headers: {},
})

export class FetchClient {
  constructor (readonly config: {
    uri: string;
    headers?: HeadersInit
  }) { }
}

export const FetchProvider: React.FC<{ client: FetchClient }> = ({ children, client }) => {
  const { uri, headers } = client.config


  return (
    <ApiContext.Provider
      value={{
        endpointUri: uri,
        headers: headers !== undefined ? headers : {}
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}