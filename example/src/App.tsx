import { useGet, useLazyGet, useLazyPost } from "@katsuo/fetch-hooks"

function App() {
  // const [getData, { loading, error, data }] = useLazyGet<{ accessToken: string }>('/login');
  const [getData, { loading, error, data }] = useLazyPost<{ accessToken: string }>('/login');

  const setToken  = () => {
    localStorage.setItem('TOKEN', 'fdsvl5v6ds51v6d.v4s1vds6v5ds64d65f4d.d54fs4f5d6s54f6s')
  }

  const removeToken  = () => {
    localStorage.removeItem('TOKEN')
  }
 
  return (
    <div>
      test
      {JSON.stringify({
        loading,
        error, 
        data
      })}
      <button onClick={setToken} >set token</button>
      <button onClick={removeToken} >remove token</button>
      <button onClick={getData} >fetch</button>
    </div>
  )
}

export default App
