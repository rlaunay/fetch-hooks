import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import FetchProvider, { createClient } from "@katsuo/fetch-hooks"

const fetchClient = createClient({
  uri: "http://localhost:3001",
  headers: {
    'Content-Type': 'application/json'
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
