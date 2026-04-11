import { createContext, useContext, useState, useEffect } from 'react';
import { loginUsuario, loginTecnico } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [tecnico, setTecnico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carrega sessão
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));

    if (session) {
      if (session.tipo === 'TECNICO') {
        setTecnico(session.dados);
      } else {
        // USER ou ADMIN
        setUsuario(session.dados);
      }
    }

    setLoading(false);
  }, []);

  // Login
  const login = async ({ email, senha }) => {
    try {
      let res = await loginUsuario(email, senha).catch(() => null);

      if (res?.usuario) {
        const tipo = res.usuario.tipo;

        setUsuario(res.usuario);

        localStorage.setItem(
          'session',
          JSON.stringify({
            tipo,
            dados: res.usuario,
            token: res.token
          })
        );

        return res.usuario;
      }

      res = await loginTecnico(email, senha).catch(() => null);

      if (res?.usuario) {
        setTecnico(res.usuario);

        localStorage.setItem(
          'session',
          JSON.stringify({
            tipo: 'TECNICO',
            dados: res.usuario,
            token: res.token
          })
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

  // 🔧 CORREÇÃO AQUI
  const role =
    usuario?.tipo ||
    usuario?.role ||
    (tecnico ? 'TECNICO' : null);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        tecnico,
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
  return useContext(AuthContext);
}