import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChamadosContext } from '../context/ChamadosContext';
import ChamadoForm from '../components/ChamadoForm';

export default function CadastrarChamado() {
  const { adicionarChamado } = useChamadosContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      await adicionarChamado(data);
      navigate('/chamados'); // volta para a lista de chamados
    } catch (err) {
      setError('Erro ao cadastrar chamado: ' + (err.message || 'tente novamente'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Abrir Novo Chamado</h2>

      {/* Botão para voltar ao Dashboard */}
      <button onClick={() => navigate('/dashboard')} style={{ marginBottom: '1rem' }}>
        Voltar para Dashboard
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ChamadoForm onSubmit={handleSubmit} disabled={loading} />
      {loading && <p>Enviando chamado...</p>}
    </div>
  );
}