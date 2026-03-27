import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CadastrarChamado from '../components/CadastrarChamado';
import EditarChamado from '../components/EditarChamado';
import ListarChamados from '../components/ListarChamados';

export default function App() {
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