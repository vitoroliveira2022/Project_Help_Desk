import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

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

export default function AppRoutes() {
  const { isAuthenticated, role, loading } = useAuthContext();

  const PrivateRoute = ({ children, allowedRoles }) => {
    if (loading) return <p>Carregando...</p>;

    if (!isAuthenticated) return <Navigate to="/login" />;

    if (allowedRoles && !allowedRoles.includes(role)) {
      return <Navigate to="/dashboard" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            loading ? (
              <p>Carregando...</p>
            ) : !isAuthenticated ? (
              <Login />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route
          path="/cadastro"
          element={
            loading ? (
              <p>Carregando...</p>
            ) : !isAuthenticated ? (
              <CadastroUsuario />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/chamados"
          element={
            <PrivateRoute allowedRoles={['USER', 'ADMIN', 'TECNICO']}>
              <ListarChamados />
            </PrivateRoute>
          }
        />

        <Route
          path="/cadastrar"
          element={
            <PrivateRoute allowedRoles={['USER', 'ADMIN']}>
              <CadastrarChamado />
            </PrivateRoute>
          }
        />

        <Route
          path="/editar/:id"
          element={
            <PrivateRoute allowedRoles={['USER', 'ADMIN']}>
              <EditarChamado />
            </PrivateRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/gerenciar-usuarios"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <GerenciarUsuarios />
            </PrivateRoute>
          }
        />

        <Route
          path="/gerenciar-tecnicos"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <GerenciarTecnicos />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={<ErrorPage mensagem="Página não encontrada" />}
        />

      </Routes>
    </BrowserRouter>
  );
}