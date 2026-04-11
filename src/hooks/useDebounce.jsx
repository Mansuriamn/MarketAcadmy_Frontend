// hooks/useDebounce.js
import { useState, useEffect } from 'react';

/**
 * Delays updating the value until the user stops typing.
 * @param {string} value - The raw input value
 * @param {number} delay - Debounce delay in ms (default: 400)
 */
const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the delay
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup: cancel the timer if value changes before delay ends
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;