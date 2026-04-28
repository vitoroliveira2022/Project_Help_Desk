import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Hook que traz dados globais de autenticação (usuário, role, status de login)
import { useAuthContext } from '../context/AuthContext';

// Importação das páginas da aplicação
import Home from '../pages/Home';
import Login from '../pages/Login';
import CadastroUsuario from '../pages/CadastroUsuario';
import Dashboard from '../pages/Dashboard';
import ListarChamados from '../pages/ListarChamados';
import CadastrarChamado from '../pages/CadastrarChamado';
import EditarChamado from '../pages/EditarChamado';
import GerenciarUsuarios from '../pages/GerenciarUsuarios';
import GerenciarTecnicos from '../pages/GerenciarTecnicos';
import ErrorPage from '../pages/ErrorPage';
import CadastrarUsuario from '../pages/CadastrarUsuario';
import EditarUsuario from '../pages/EditarUsuario';
import CadastrarTecnico from '../pages/CadastrarTecnico';
import EditarTecnico from '../pages/EditarTecnico';
import ChamadosTecnico from '../pages/ChamadosTecnico';
import ChamadosResolvidos from '../pages/ChamadosResolvidos';

export default function AppRoutes() {

  // Pega informações globais de autenticação
  const { isAuthenticated, role, loading } = useAuthContext();

  // Enquanto estiver verificando login (ex: restaurando sessão), mostra carregamento
  if (loading) {
    return <p>Carregando...</p>;
  }

  // Componente interno para proteger rotas (controle de acesso)
  const PrivateRoute = ({ children, allowedRoles }) => {

    // Se não estiver logado, redireciona para login
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    // Se a rota tiver restrição de roles e o usuário não tiver permissão
    if (allowedRoles && !allowedRoles.includes(role)) {
      return <Navigate to="/dashboard" />;
    }

    // Se passou nas validações, libera o acesso à página
    return children;
  };

  return (
    <BrowserRouter>

      <Routes>

        {/* ==================== ROTAS PÚBLICAS ==================== */}

        {/* Página inicial */}
        <Route path="/" element={<Home />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Cadastro de usuário (público) */}
        <Route path="/cadastro" element={<CadastroUsuario />} />

        {/* ==================== ROTAS PROTEGIDAS ==================== */}

        {/* Dashboard (qualquer usuário logado) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Lista de chamados (USER e ADMIN) */}
        <Route
          path="/chamados"
          element={
            <PrivateRoute allowedRoles={['USER', 'ADMIN']}>
              <ListarChamados />
            </PrivateRoute>
          }
        />

        {/* Criar chamado (USER e ADMIN) */}
        <Route
          path="/cadastrar"
          element={
            <PrivateRoute allowedRoles={['USER', 'ADMIN']}>
              <CadastrarChamado />
            </PrivateRoute>
          }
        />

        {/* Editar chamado por ID (USER e ADMIN) */}
        <Route
          path="/editar/:id"
          element={
            <PrivateRoute allowedRoles={['USER', 'ADMIN']}>
              <EditarChamado />
            </PrivateRoute>
          }
        />

        {/* ==================== ROTAS ADMIN ==================== */}

        {/* Gerenciamento de usuários */}
        <Route
          path="/gerenciar-usuarios"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <GerenciarUsuarios />
            </PrivateRoute>
          }
        />

        {/* Gerenciamento de técnicos */}
        <Route
          path="/gerenciar-tecnicos"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <GerenciarTecnicos />
            </PrivateRoute>
          }
        />

        {/* Criar usuário (ADMIN) */}
        <Route
          path="/usuarios/novo"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <CadastrarUsuario />
            </PrivateRoute>
          }
        />

        {/* Editar usuário (ADMIN) */}
        <Route
          path="/usuarios/editar/:id"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <EditarUsuario />
            </PrivateRoute>
          }
        />

        {/* Criar técnico (ADMIN) */}
        <Route
          path="/tecnicos/novo"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <CadastrarTecnico />
            </PrivateRoute>
          }
        />

        {/* Editar técnico (ADMIN) */}
        <Route
          path="/tecnicos/editar/:id"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <EditarTecnico />
            </PrivateRoute>
          }
        />

        {/* ==================== ROTAS TÉCNICO ==================== */}

        {/* Chamados atribuídos ao técnico */}
        <Route
          path="/chamados-tecnico"
          element={
            <PrivateRoute allowedRoles={['TECNICO']}>
              <ChamadosTecnico />
            </PrivateRoute>
          }
        />

        {/* Chamados resolvidos pelo técnico */}
        <Route
          path="/chamados-resolvidos"
          element={
            <PrivateRoute allowedRoles={['TECNICO']}>
              <ChamadosResolvidos />
            </PrivateRoute>
          }
        />

        {/* ==================== ROTA 404 ==================== */}

        {/* Qualquer rota inexistente */}
        <Route
          path="*"
          element={<ErrorPage mensagem="Página não encontrada" />}
        />

      </Routes>
    </BrowserRouter>
  );
}