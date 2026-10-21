import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiRequest } from "../Services/Api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const data = await apiRequest("/auth/me");

        if (active) {
          setUser(data.member ?? data.user ?? null);
        }
      } catch {
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  async function login(email, password) {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const member = data.member ?? data.user ?? null;
    setUser(member);

    return member;
  }

  async function register(formData) {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  }

  async function logout() {
    await apiRequest("/auth/logout", {
      method: "POST",
    });

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider.",
    );
  }

  return context;
}