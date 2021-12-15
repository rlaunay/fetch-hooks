import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import FetchProvider, { FetchClient } from "@katsuo/fetch-hooks"

const fetchClient = new FetchClient({
  uri: "http://localhost:3001",
  headers: {
    'Content-Type': 'application/json'
  }
})

ReactDOM.render(
  <React.StrictMode>
    <FetchProvider client={fetchClient} >
      <App />
    </FetchProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
