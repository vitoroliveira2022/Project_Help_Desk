import AppRoutes from './routes/AppRoutes';
import { ChamadosProvider } from './context/ChamadosContext';

export default function App() {
  return (
    <ChamadosProvider>
      <AppRoutes />
    </ChamadosProvider>
  );
}