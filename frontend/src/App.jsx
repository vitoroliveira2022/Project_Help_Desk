// src/App.jsx
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { ChamadosProvider } from './context/ChamadosContext';

export default function App() {
  return (
    <AuthProvider>
      <ChamadosProvider>
        <AppRoutes />
      </ChamadosProvider>
    </AuthProvider>
  );
}