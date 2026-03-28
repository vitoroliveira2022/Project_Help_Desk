import useChamados from './hooks/useChamados';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  const {
    chamados,
    adicionarChamado,
    atualizarChamado,
    removerChamado,
    loading,
    error
  } = useChamados(); // cria as variaveis para a lista de chamados e as funções 

  return (
  <AppRoutes // passa as variaveis e funções como props para as rotas
    chamados={chamados}
    loading={loading}
    error={error}
    adicionarChamado={adicionarChamado}
    atualizarChamado={atualizarChamado}
    removerChamado={removerChamado}
  />
  );
}