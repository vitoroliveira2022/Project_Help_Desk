import { useNavigate } from 'react-router-dom';

export default function ErrorPage({ mensagem = 'Erro inesperado' }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ color: 'red' }}>Algo deu errado!</h2>

      <p>{mensagem}</p>

      <button
        onClick={() => navigate('/dashboard')}
        style={{ marginTop: '1rem' }}
      >
        Voltar para Dashboard
      </button>
    </div>
  );
}