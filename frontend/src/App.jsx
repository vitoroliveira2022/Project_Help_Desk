import AppRoutes from './routes/AppRoutes';
import { ChamadosProvider } from './context/ChamadosContext';

export default function App() {
  return (
    // ChamadosProvider cria e fornece o contexto ao AppRoutes
    // qualquer componente de AppRoutes terá acesso ao contexto de chamados (dados e funções)
    <ChamadosProvider>

      {/* AppRoutes é responsável pelo controle de rotas da aplicação.
          Ele renderiza diferentes páginas/componentes dependendo da URL */}
      <AppRoutes />

    </ChamadosProvider>
  );
}