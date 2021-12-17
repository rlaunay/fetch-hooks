import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import FetchProvider, { FetchClient } from "@katsuo/fetch-hooks"

const fetchClient = new FetchClient({
  uri: "http://localhost:3001",
  headers: {
    'Content-Type': 'application/json'
  },
  link: (headers) => {
    const token = localStorage.getItem('TOKEN');
    return {
      ...headers,
      Authorisation: token ? `Baerer ${token}` : ''
    }
  },
  debug: true
})

ReactDOM.render(
  <React.StrictMode>
    <FetchProvider client={fetchClient} >
      <App />
    </FetchProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
