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
        setError('Erro ao carregar chamado: ' + (err.message || 'tente novamente'));
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
      setError('Erro ao atualizar chamado: ' + (err.message || 'tente novamente'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Carregando chamado...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!data) return <p>Chamado não encontrado</p>;

  return (
    <div>
      <h2>Editar Chamado</h2>

      <button
        onClick={() => navigate('/dashboard')}
        style={{ marginBottom: '1rem' }}
      >
        Voltar para Dashboard
      </button>

      <ChamadoForm
        initialData={data}
        onSubmit={handleSubmit}
        disabled={saving}
      />

      {saving && <p>Salvando alterações...</p>}
    </div>
  );
}