import { useFetch, useLazyFetch } from "./hooks/useFetch"
import { createClient, FetchProvider } from "./context/ApiContext"

export {
  useFetch,
  useLazyFetch,
  createClient
}

export default FetchProvider;