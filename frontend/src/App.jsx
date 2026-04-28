// src/App.jsx

// Importa o componente de rotas da aplicação
import AppRoutes from './routes/AppRoutes';

// Importa o Provider de autenticação (controla login, usuário, permissões)
import { AuthProvider } from './context/AuthContext';

// Importa o Provider de chamados (controla estado e lógica dos chamados)
import { ChamadosProvider } from './context/ChamadosContext';

export default function App() {
  return (
    // AuthProvider envolve toda a aplicação para disponibilizar autenticação global
    <AuthProvider>

      {/* ChamadosProvider fornece dados e funções relacionadas aos chamados
          para todos os componentes dentro da aplicação */}
      <ChamadosProvider>

        {/* Componente responsável por definir todas as rotas do sistema 
            As páginas dentro do AppRoutes conseguem acessar auth e chamados porque estão dentro dos Providers*/}
        <AppRoutes />

      </ChamadosProvider>
    </AuthProvider>
  );
}