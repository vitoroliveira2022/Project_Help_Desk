// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bem-vindo ao Sistema de Chamados</h1>
      <p>
        Aqui você pode criar, visualizar e gerenciar chamados de forma prática e organizada.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <button 
          style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}
          onClick={() => navigate('/login')}
        >
          Login
        </button>

        <button 
          style={{ padding: '0.5rem 1rem' }}
          onClick={() => navigate('/cadastro')}
        >
          Criar Conta
        </button>
      </div>
    </div>
  );
}