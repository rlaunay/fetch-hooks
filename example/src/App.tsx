import { useGet, useLazyGet } from "@katsuo/fetch-hooks"

function App() {
  const { loading, error, data } = useGet('/login', {
    oui: 'non'
  });

  return (
    <div>
      test
      {JSON.stringify({
        loading,
        error, 
        data
      })}
      {/* <button onClick={getData} >fetch</button> */}
    </div>
  )
}

export default App
