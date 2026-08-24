//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import '../src/styles/globals.scss';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <BrowserRouter>
    <Toaster 
      position='top-right'
      toastOptions={{
        duration: 3000
      }}
    />
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
  //</StrictMode>,
)
