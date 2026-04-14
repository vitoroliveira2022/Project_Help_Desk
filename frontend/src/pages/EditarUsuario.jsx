import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getUsuarioById,
  updateUsuario,
} from '../services/usuariosService';

import UsuarioForm from '../components/UsuarioForm';

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getUsuarioById(id);
        setUsuario(data);
      } catch (err) {
        setError('Erro ao carregar usuário');
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, [id]);

  const handleSubmit = async (form) => {
    try {
      await updateUsuario(id, form);
      navigate('/gerenciar-usuarios');
    } catch (err) {
      setError('Erro ao atualizar usuário');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Editar Usuário</h2>

      <UsuarioForm
        onSubmit={handleSubmit}
        usuarioEditando={usuario}
      />

      <button onClick={() => navigate('/gerenciar-usuarios')}>
        Voltar
      </button>
    </div>
  );
}