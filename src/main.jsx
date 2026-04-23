import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { AuthProvider } from './context/AuthContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import ReloadPrompt from './components/ReloadPrompt.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <App />
          <ReloadPrompt />
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  </StrictMode>,
)
