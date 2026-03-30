import AppRoutes from './routes/AppRoutes';
import { ChamadosProvider } from './context/ChamadosContext';

export default function App() {
  return (
    // ChamadosProvider envolve toda a aplicação, permitindo que qualquer componente dentro de 
    // AppRoutes tenha acesso ao contexto de chamados (dados e funções)
    <ChamadosProvider>

      {/* AppRoutes é responsável pelo controle de rotas da aplicação.
          Ele renderiza diferentes páginas/componentes dependendo da URL */}
      <AppRoutes />

    </ChamadosProvider>
  );
}