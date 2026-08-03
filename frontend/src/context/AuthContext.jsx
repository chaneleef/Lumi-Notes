import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios";

const AuthContext = createContext(null);

const GUEST_KEY = "lumi-guest-mode";

// mode: "loading" | "authed" | "guest" | "anon"
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("loading");

  // On first load, ask the server who we are (via the httpOnly cookie).
  useEffect(() => {
    const check = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
        setMode("authed");
        localStorage.removeItem(GUEST_KEY);
      } catch {
        // not logged in — fall back to guest mode if it was chosen before
        setUser(null);
        setMode(localStorage.getItem(GUEST_KEY) ? "guest" : "anon");
      }
    };
    check();
  }, []);

  // If any authed request comes back 401 (expired/invalid session), drop to signed-out.
  useEffect(() => {
    const id = api.interceptors.response.use(
      (r) => r,
      (error) => {
        const url = error.config?.url || "";
        if (error.response?.status === 401 && !url.includes("/auth/")) {
          setUser(null);
          setMode(localStorage.getItem(GUEST_KEY) ? "guest" : "anon");
        }
        return Promise.reject(error);
      }
    );
    return () => api.interceptors.response.eject(id);
  }, []);

  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    localStorage.removeItem(GUEST_KEY);
    setUser(res.data);
    setMode("authed");
  };

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.removeItem(GUEST_KEY);
    setUser(res.data);
    setMode("authed");
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem(GUEST_KEY);
      setUser(null);
      setMode("anon");
    }
  };

  const continueAsGuest = () => {
    localStorage.setItem(GUEST_KEY, "1");
    setMode("guest");
  };

  const value = { user, mode, register, login, logout, continueAsGuest };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
