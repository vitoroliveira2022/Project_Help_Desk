// Importa funções do React para criar contexto e controlar estado
import { createContext, useContext, useState, useEffect } from 'react';

// Importa a função de login que fala com o backend
import { login as loginService } from '../services/authService';

// Cria o "contexto" de autenticação (uma caixinha global de dados)
const AuthContext = createContext();

// Componente que vai envolver a aplicação inteira
export function AuthProvider({ children }) {

  // Guarda os dados do usuário logado (começa vazio)
  const [user, setUser] = useState(null);

  // Indica se ainda está carregando/verificando login
  const [loading, setLoading] = useState(true);

  // Guarda possíveis erros (ex: login errado)
  const [error, setError] = useState(null);
    
  // Quando o app inicia (App.jsx é renderizado) ou ao dar F5,
  // o AuthProvider é montado e esse useEffect roda
  useEffect(() => {

    // Pega os dados salvos no navegador (se existirem)
    const session = JSON.parse(localStorage.getItem('session'));

    // Se existir usuário salvo, restaura ele
    if (session?.dados) {
      setUser(session.dados);
    }

    // Finaliza o carregamento
    setLoading(false);

  }, []);

  // Função de login
  const login = async ({ email, senha }) => {
    try {

      // Chama o backend para autenticar
      const res = await loginService(email, senha);

      // Salva o usuário no estado
      setUser(res.usuario);

      // Salva os dados no navegador para não perder ao atualizar a página
      localStorage.setItem(
        'session',
        JSON.stringify({
          dados: res.usuario, // dados do usuário
          token: res.token    // token de autenticação
        })
      );

      // Retorna o usuário logado
      return res.usuario;

    } catch (err) {

      // Se der erro, salva a mensagem
      setError(err.message);

      // Lança o erro para quem chamou tratar
      throw err;
    }
  };

  // Função para sair (logout)
  const logout = () => {

    // Remove o usuário do estado
    setUser(null);

    // Remove os dados salvos do navegador
    localStorage.removeItem('session');
  };

  // Verifica se está autenticado (true se existir usuário)
  const isAuthenticated = !!user;

  // Pega o tipo do usuário (ADMIN, USER, TECNICO...)
  const role = user?.role;

  // Disponibiliza tudo isso para o resto da aplicação
  return (
    <AuthContext.Provider
      value={{
        user,              // dados do usuário
        login,             // função de login
        logout,            // função de logout
        loading,           // estado de carregamento
        isAuthenticated,   // se está logado ou não
        role,              // tipo do usuário
        error              // erro (se houver)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acessar o contexto facilmente
export function useAuthContext() {

  // Pega os dados do contexto
  const context = useContext(AuthContext);

  // Se usar fora do provider, dá erro
  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de AuthProvider');
  }

  // Retorna os dados do contexto
  return context;
}