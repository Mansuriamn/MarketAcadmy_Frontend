/**
 * API Configuration & Utility
 * Senior Developer Approach: Centralizing API base URL and common fetch logic.
 * This ensures consistency, simplifies maintenance, and handles environment-specific prefixes.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

/**
 * Standardized API call wrapper
 * @param {string} endpoint - The API endpoint (e.g., '/api/send-otp')
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<any>} - The parsed JSON response
 */
export const apiCall = async (endpoint, options = {}) => {
  const { silent = false, unwrap = true, ...fetchOptions } = options;
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  const defaultHeaders = {
    ...(fetchOptions.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...fetchOptions.headers,
  };

  try {
    const response = await fetch(url, {
      credentials: "include", 
      ...fetchOptions,
      headers: defaultHeaders,
    });

    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }

    if (!response.ok) {
      if (response.status === 401) {
        window.dispatchEvent(new Event("api:401"));
      }
      throw new Error(data.message || `API Error: ${response.status}`);
    }

    // unwrap: false → return the full envelope; unwrap: true (default) → extract .data if present
    return unwrap && data && data.data !== undefined ? data.data : data;

  } catch (error) {
    if (!silent) {
       console.error(`[API Error] ${endpoint}:`, error);
    }
    throw error;
  }
};

export default API_BASE_URL;
