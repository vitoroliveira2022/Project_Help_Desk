import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ListarChamados from '../pages/ListarChamados';
import CadastrarChamado from '../pages/CadastrarChamado';
import EditarChamado from '../pages/EditarChamado';

// desestruturando as funções do hook para passar como props
export default function AppRoutes({
  chamados,
  adicionarChamado,
  atualizarChamado,
  removerChamado,
  loading,
  error
}) 

{
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ListarChamados
                chamados={chamados}
                removerChamado={removerChamado}
                loading={loading}
                error={error}
            />
          }
        />

        <Route
          path="/cadastrar"
          element={
            <CadastrarChamado
              adicionarChamado={adicionarChamado}
            />
          }
        />

        <Route
          path="/editar/:id"
          element={
            <EditarChamado
              atualizarChamado={atualizarChamado}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}