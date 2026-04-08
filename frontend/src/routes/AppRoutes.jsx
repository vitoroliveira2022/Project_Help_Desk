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
import CadastrarUsuarioAdmin from '../pages/CadastrarUsuarioAdmin';
import CadastrarTecnico from '../pages/CadastrarTecnico';
import EditarUsuario from '../pages/EditarUsuario';
import EditarTecnico from '../pages/EditarTecnico';
import ErrorPage from '../pages/ErrorPage';

export default function AppRoutes() {
  const { isAuthenticated, role } = useAuthContext();

  const PrivateRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/dashboard" />;
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />

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

        {/* Gerenciamento Admin */}
        <Route
          path="/gerenciar-usuarios"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <GerenciarUsuarios />
            </PrivateRoute>
          }
        />
        <Route
          path="/cadastrar-usuario"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <CadastrarUsuarioAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/editar-usuario/:id"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <EditarUsuario />
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
          path="/cadastrar-tecnico"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <CadastrarTecnico />
            </PrivateRoute>
          }
        />
        <Route
          path="/editar-tecnico/:id"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <EditarTecnico />
            </PrivateRoute>
          }
        />

        {/* Página de erro / 404 */}
        <Route path="*" element={<ErrorPage mensagem="Página não encontrada" />} />
      </Routes>
    </BrowserRouter>
  );
}