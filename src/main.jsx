import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 👉 Registro automático del Service Worker PWA
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })

// 👉 Render principal de la app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
