// No frontend, rotas controlam qual componente é renderizado com base na URL.

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ListarChamados from '../pages/ListarChamados';
import CadastrarChamado from '../pages/CadastrarChamado';
import EditarChamado from '../pages/EditarChamado';
import ErrorPage from '../pages/ErrorPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListarChamados />} />
        <Route path="/cadastrar" element={<CadastrarChamado />} />
        <Route path="/editar/:id" element={<EditarChamado />} />

        {/* Rota para páginas inexistentes */}
        <Route path="*" element={<ErrorPage mensagem="Página não encontrada" />} />
      </Routes>
    </BrowserRouter>
  );
}