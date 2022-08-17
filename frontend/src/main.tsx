import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './assets/fonts/fonts.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './common/contexts/AuthContext'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
