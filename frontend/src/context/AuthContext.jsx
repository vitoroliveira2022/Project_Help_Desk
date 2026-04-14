import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));

    if (session?.dados) {
      setUser(session.dados);
    }

    setLoading(false);
  }, []);

  const login = async ({ email, senha }) => {
    try {
      const res = await loginService(email, senha);

      setUser(res.usuario);

      localStorage.setItem(
        'session',
        JSON.stringify({
          dados: res.usuario,
          token: res.token
        })
      );

      return res.usuario;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('session');
  };

  const isAuthenticated = !!user;

  // ✅ AGORA PADRÃO CORRETO DO BACKEND
  const role = user?.role;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated,
        role,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de AuthProvider');
  }

  return context;
}