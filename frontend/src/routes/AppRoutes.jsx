import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

import Home from '../pages/Home';
import Login from '../pages/Login';
import CadastroUsuario from '../pages/CadastroUsuario';
import Dashboard from '../pages/Dashboard';
import ListarChamados from '../pages/ListarChamados';
import CadastrarChamado from '../pages/CadastrarChamado';
import EditarChamado from '../pages/EditarChamado';
import ErrorPage from '../pages/ErrorPage';

export default function AppRoutes() {
  const { isAuthenticated, role, loading } = useAuthContext();

  // 🔒 Rota privada
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

        {/* Páginas públicas */}
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

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Chamados */}
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

        {/* 404 */}
        <Route
          path="*"
          element={<ErrorPage mensagem="Página não encontrada" />}
        />

      </Routes>
    </BrowserRouter>
  );
}