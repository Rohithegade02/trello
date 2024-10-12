import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='155472211468-v6ao6epg1973qoc2omsfhdg5c9e9okn7.apps.googleusercontent.com'>
    <App />
  </GoogleOAuthProvider>,
)
