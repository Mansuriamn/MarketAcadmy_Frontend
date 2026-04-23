import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

/**
 * Senior Developer UX Strategy:
 * NProgress provides immediate feedback to users during route transitions.
 * This is crucial for Single Page Apps (SPAs) to feel responsive on all networks.
 */

// Configure nprogress
nprogress.configure({ 
  showSpinner: false, 
  easing: 'ease', 
  speed: 500,
  minimum: 0.3
});

const useRouteChangeProgress = () => {
  const location = useLocation();

  useEffect(() => {
    // Start progress on route change
    nprogress.start();

    // Small delay to simulate "completing" the work after the route is rendered
    const timer = setTimeout(() => {
      nprogress.done();
    }, 100);

    return () => {
      clearTimeout(timer);
      nprogress.done();
    };
  }, [location]);

  return null;
};

export default useRouteChangeProgress;
