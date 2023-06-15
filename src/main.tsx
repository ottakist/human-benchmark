import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import './normalize.css'
import './index.css'
import { AppProvider } from './context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-bjtfg3031vtztwqx.us.auth0.com'
      clientId='jL6zTh4e8awO4TVpfsC7eLm9E7dptW6N'
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      cacheLocation='localstorage'
    >
      <AppProvider>
        <App />
      </AppProvider>
    </Auth0Provider>
  </React.StrictMode>
)
