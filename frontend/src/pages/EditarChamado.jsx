import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChamadosContext } from '../context/ChamadosContext';
import ChamadoForm from '../components/ChamadoForm';

export default function EditarChamado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { atualizarChamado, buscarChamadoPorId } = useChamadosContext();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        setError(null);

        const chamado = await buscarChamadoPorId(id);
        setData(chamado);
      } catch (err) {
        setError(
          'Erro ao carregar chamado: ' +
            (err.message || 'tente novamente')
        );
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  const handleSubmit = async (form) => {
    setSaving(true);
    setError(null);

    try {
      await atualizarChamado(id, form);
      navigate('/chamados');
    } catch (err) {
      setError(
        'Erro ao atualizar chamado: ' +
          (err.message || 'tente novamente')
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Carregando chamado...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate('/chamados')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Chamado não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Editar Chamado
        </h2>

        <button
          onClick={() => navigate('/dashboard')}
          className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Voltar para Dashboard
        </button>

        <ChamadoForm
          initialData={data}
          onSubmit={handleSubmit}
          disabled={saving}
        />

        {saving && (
          <p className="mt-4 text-blue-500">
            Salvando alterações...
          </p>
        )}
      </div>
    </div>
  );
}