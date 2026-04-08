import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TecnicoForm from '../components/TecnicoForm';
import { getTecnicoById, updateTecnico } from '../services/tecnicosService';

export default function EditarTecnico() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tecnico, setTecnico] = useState(null);

  useEffect(() => {
    async function carregar() {
      const data = await getTecnicoById(id);
      setTecnico(data);
    }
    carregar();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await updateTecnico(id, data);
      navigate('/gerenciar-tecnicos');
    } catch {
      alert('Erro ao atualizar técnico');
    }
  };

  if (!tecnico) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Editar Técnico</h2>
      <TecnicoForm initialData={tecnico} onCadastrar={handleSubmit} />
    </div>
  );
}