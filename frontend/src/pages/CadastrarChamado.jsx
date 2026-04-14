import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChamadosContext } from '../context/ChamadosContext';
import ChamadoForm from '../components/ChamadoForm';

export default function CadastrarChamado() {
  const { adicionarChamado } = useChamadosContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await adicionarChamado(data);

      setSuccess(true);

      // pequeno delay melhora UX (usuário percebe sucesso)
      setTimeout(() => {
        navigate('/chamados');
      }, 800);

    } catch (err) {
      setError('Erro ao cadastrar chamado: ' + (err.message || 'tente novamente'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Abrir Novo Chamado</h2>

      <button
        onClick={() => navigate('/dashboard')}
        style={{ marginBottom: '1rem' }}
        disabled={loading}
      >
        Voltar para Dashboard
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Chamado criado com sucesso!</p>}

      <ChamadoForm onSubmit={handleSubmit} disabled={loading} />

      {loading && <p>Enviando chamado...</p>}
    </div>
  );
}