import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getTecnicoById,
  updateTecnico,
} from '../services/tecnicosService';

import TecnicoForm from '../components/TecnicoForm';

export default function EditarTecnico() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tecnico, setTecnico] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const data = await getTecnicoById(id);
        setTecnico(data);
      } catch (err) {
        alert('Erro ao carregar técnico');
      }
    };

    carregar();
  }, [id]);

  const handleSubmit = async (form) => {
    try {
      await updateTecnico(id, form);
      navigate('/gerenciar-tecnicos');
    } catch (err) {
      alert('Erro ao atualizar técnico');
    }
  };

  if (!tecnico) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Editar Técnico</h2>

      <TecnicoForm
        onSubmit={handleSubmit}
        tecnicoEditando={tecnico}
      />

      <button onClick={() => navigate('/gerenciar-tecnicos')}>
        Voltar
      </button>
    </div>
  );
}