import React, { createContext } from "react";
import { ApiContextType, ClientConfig } from "../types";

export const ApiContext = createContext<ApiContextType>({
  endpointUri: '',
  headers: {},
  debug: false
})

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
  const { uri, headers, debug } = client.config


  return (
    <ApiContext.Provider
      value={{
        endpointUri: uri,
        headers: headers !== undefined ? headers : {},
        debug: !!debug
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}