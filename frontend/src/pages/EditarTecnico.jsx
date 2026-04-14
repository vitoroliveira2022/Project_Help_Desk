import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getUsuarioById,
  updateUsuario,
} from '../services/usuariosService';

import TecnicoForm from '../components/TecnicoForm';

export default function EditarTecnico() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tecnico, setTecnico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getUsuarioById(id);
        setTecnico(data);
      } catch (err) {
        setError('Erro ao carregar técnico');
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, [id]);

  const handleSubmit = async (form) => {
    try {
      await updateUsuario(id, {
        ...form,
        role: 'TECNICO',
      });

      navigate('/gerenciar-tecnicos');
    } catch (err) {
      setError('Erro ao atualizar técnico');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

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