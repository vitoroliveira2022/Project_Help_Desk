import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChamadosContext } from '../context/ChamadosContext';
import ChamadoForm from '../components/ChamadoForm';

export default function EditarChamado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { atualizarChamado, buscarChamadoPorId } = useChamadosContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function carregar() {
      const chamado = await buscarChamadoPorId(id);
      setData(chamado);
    }
    carregar();
  }, [id]);

  const handleSubmit = async (form) => {
    await atualizarChamado(id, form);
    navigate('/');
  };

  if (!data) return <p>Carregando...</p>;

  return <ChamadoForm initialData={data} onSubmit={handleSubmit} />;
}