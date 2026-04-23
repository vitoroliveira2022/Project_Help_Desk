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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Novo Técnico
        </h2>

        {error && (
          <p className="mb-4 text-red-500 text-sm">
            {error}
          </p>
        )}

        <TecnicoForm
          onSubmit={handleSubmit}
          disabled={loading}
        />

        <button
          onClick={() => navigate('/gerenciar-tecnicos')}
          disabled={loading}
          className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded transition disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Voltar'}
        </button>
      </div>
    </div>
  );
}