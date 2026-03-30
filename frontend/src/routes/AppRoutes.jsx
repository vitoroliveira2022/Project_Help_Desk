import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ListarChamados from '../pages/ListarChamados';
import CadastrarChamado from '../pages/CadastrarChamado';
import EditarChamado from '../pages/EditarChamado';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListarChamados />} />
        <Route path="/cadastrar" element={<CadastrarChamado />} />
        <Route path="/editar/:id" element={<EditarChamado />} />
      </Routes>
    </BrowserRouter>
  );
}