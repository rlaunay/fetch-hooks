import { useGet, useLazyGet } from "./hooks/useGet"
import { useLazyPost, usePost } from "./hooks/usePost"
import { useLazyPut, usePut } from "./hooks/usePut"
import { useDelete, useLazyDelete } from "./hooks/useDelete"
import { FetchClient, FetchProvider } from "./context/ApiContext"

export {
  useGet,
  useLazyGet,
  usePost,
  useLazyPost,
  usePut,
  useLazyPut,
  useDelete,
  useLazyDelete,
  FetchClient
}

export default FetchProvider;