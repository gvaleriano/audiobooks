import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import './styles/app.css'
import { Main } from './components/Main'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main/>
  </React.StrictMode>,
)
