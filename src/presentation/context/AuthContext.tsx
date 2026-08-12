import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

interface AuthUser {
  username: string;
}

interface AuthContextData {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login(username: string, password: string): Promise<boolean>;
  logout(): void;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "CraftFlow2026";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  async function login(
    username: string,
    password: string,
  ): Promise<boolean> {
    try {
      setLoading(true);

      const normalizedUsername = username.trim();

      if (
        normalizedUsername === VALID_USERNAME &&
        password === VALID_PASSWORD
      ) {
        setUser({
          username: normalizedUsername,
        });

        return true;
      }

      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}