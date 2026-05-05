import { createContext, useContext, useEffect, useState } from "react";
import { apiCall } from "../api/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await apiCall("/api/auth/logout", { method: "POST", silent: true });
    } catch (err) {
      console.error("Logout failed on server:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("admin");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const handleUnauthorized = () => {
      console.warn("Session expired or invalid. Logging out...");
      logout();
    };

    window.addEventListener("api:401", handleUnauthorized);

    const checkAuth = async () => {
      // Senior Dev: Optimization - only verify session if we have a local tag (hint)
      const hasAdminHint = localStorage.getItem("admin");
      
      if (!hasAdminHint) {
        setLoading(false);
        return;
      }

      try {
        const data = await apiCall("/api/auth/me", { silent: true });
        setUser(data?.user || null);
      } catch {
        // If the server says 401 but we had a hint, the session actually expired
        setUser(null);
        localStorage.removeItem("admin");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    
    return () => window.removeEventListener("api:401", handleUnauthorized);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);