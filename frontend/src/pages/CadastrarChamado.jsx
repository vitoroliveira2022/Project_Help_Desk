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

      setTimeout(() => {
        navigate('/chamados');
      }, 800);
    } catch (err) {
      setError(
        'Erro ao cadastrar chamado: ' +
          (err.message || 'tente novamente')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Abrir Novo Chamado
        </h2>

        <button
          onClick={() => navigate('/dashboard')}
          disabled={loading}
          className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition disabled:opacity-50"
        >
          Voltar para Dashboard
        </button>

        {error && (
          <p className="mb-3 text-red-500 text-sm">
            {error}
          </p>
        )}

        {success && (
          <p className="mb-3 text-green-600 text-sm">
            Chamado criado com sucesso!
          </p>
        )}

        <ChamadoForm
          onSubmit={handleSubmit}
          disabled={loading}
        />

        {loading && (
          <p className="mt-4 text-blue-500 text-sm">
            Enviando chamado...
          </p>
        )}
      </div>
    </div>
  );
}