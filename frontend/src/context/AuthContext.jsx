import { createContext, useContext, useState, useEffect } from 'react';
import { loginUsuario, loginTecnico } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [tecnico, setTecnico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carrega sessão do localStorage ao iniciar
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session) {
      if (session.tipo === 'USUARIO') setUsuario(session.dados);
      if (session.tipo === 'TECNICO') setTecnico(session.dados);
    }
    setLoading(false);
  }, []);

  // Login
  const login = async ({ email, senha }) => {
    try {
      // Tenta login como usuário
      let res = await loginUsuario(email, senha).catch(() => null);

      if (res?.usuario) {
        setUsuario(res.usuario);
        localStorage.setItem(
          'session',
          JSON.stringify({ tipo: 'USUARIO', dados: res.usuario, token: res.token })
        );
        return res.usuario;
      }

      // Se não foi usuário, tenta como técnico
      res = await loginTecnico(email, senha).catch(() => null);
      if (res?.usuario) {
        setTecnico(res.usuario);
        localStorage.setItem(
          'session',
          JSON.stringify({ tipo: 'TECNICO', dados: res.usuario, token: res.token })
        );
        return res.usuario;
      }

      throw new Error('Credenciais inválidas');
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    setUsuario(null);
    setTecnico(null);
    localStorage.removeItem('session');
  };

  const isAuthenticated = !!usuario || !!tecnico;
  const role = usuario?.tipo || tecnico?.tipo || null;

  return (
    <AuthContext.Provider
      value={{ usuario, tecnico, login, logout, loading, isAuthenticated, role, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuthContext() {
  return useContext(AuthContext);
}