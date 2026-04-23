import React from 'react';

/**
 * Senior Developer Reliability Pattern: Global Error Boundary.
 * This prevents a single component crash from turning the entire app into a white screen.
 * It provides a graceful recovery UI and logs the error for debugging.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service like Sentry
    console.error("Critical UI Crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Premium Fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
              We encountered an unexpected error. Don't worry, your data is safe—just a little UI hiccup.
            </p>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
            >
              Return to Home
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors"
            >
              Try Refreshing Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
