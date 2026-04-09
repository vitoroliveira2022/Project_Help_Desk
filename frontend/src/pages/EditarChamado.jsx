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
  const [error, setError] = useState(null);

  // Carrega os dados do chamado ao montar
  useEffect(() => {
    async function carregar() {
      try {
        const chamado = await buscarChamadoPorId(id);
        setData(chamado);
      } catch (err) {
        setError('Erro ao carregar chamado: ' + (err.message || 'tente novamente'));
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [id, buscarChamadoPorId]);

  const handleSubmit = async (form) => {
    setLoading(true);
    setError(null);

    try {
      await atualizarChamado(id, form);
      navigate('/chamados'); // volta para a lista de chamados
    } catch (err) {
      setError('Erro ao atualizar chamado: ' + (err.message || 'tente novamente'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando chamado...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!data) return <p>Chamado não encontrado</p>;

  return (
    <div>
      <h2>Editar Chamado</h2>

      {/* Botão para voltar ao Dashboard */}
      <button onClick={() => navigate('/dashboard')} style={{ marginBottom: '1rem' }}>
        Voltar para Dashboard
      </button>

      <ChamadoForm initialData={data} onSubmit={handleSubmit} disabled={loading} />
      {loading && <p>Salvando alterações...</p>}
    </div>
  );
}