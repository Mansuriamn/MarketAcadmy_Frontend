import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { AuthProvider } from './context/AuthContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import ReloadPrompt from './components/ReloadPrompt.jsx';

import { CacheProvider } from './context/CacheContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ErrorBoundary>
        <CacheProvider>
          <AuthProvider>
            <App />
            <ReloadPrompt />
          </AuthProvider>
        </CacheProvider>
      </ErrorBoundary>
    </Router>
  </StrictMode>,
)
