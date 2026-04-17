import { useNavigate } from 'react-router-dom';
import { createTecnico } from '../services/usuariosService';
import TecnicoForm from '../components/TecnicoForm';
import { useState } from 'react';

export default function CadastrarTecnico() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (form) => {
    try {
      setLoading(true);
      setError(null);

      await createTecnico(form);

      navigate('/gerenciar-tecnicos');
    } catch (err) {
      console.error(err);
      setError('Erro ao criar técnico');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Novo Técnico</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <TecnicoForm
        onSubmit={handleSubmit}
        disabled={loading}
      />

      <button
        onClick={() => navigate('/gerenciar-tecnicos')}
        disabled={loading}
      >
        {loading ? 'Salvando...' : 'Voltar'}
      </button>
    </div>
  );
}