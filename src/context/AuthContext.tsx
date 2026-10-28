import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

// NOTE: This is a client-side only gate. Since the portfolio is a static site
// with no backend, this password check happens in the browser and is NOT
// cryptographically secure. It is meant to keep the admin UI out of casual
// reach, not to protect against a determined attacker. Change the password
// below (or move to a real backend) if stronger protection is needed.
const ADMIN_PASSWORD = 'password';
const AUTH_KEY = 'portfolio_admin_auth';

interface AuthContextValue {
  isAuthed: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthed, setIsAuthed] = useState<boolean>(
    () => sessionStorage.getItem(AUTH_KEY) === 'true',
  );

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthed(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
