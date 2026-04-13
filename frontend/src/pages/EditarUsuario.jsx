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

  useEffect(() => {
    const carregar = async () => {
      try {
        const data = await getUsuarioById(id);
        setUsuario(data);
      } catch (err) {
        alert('Erro ao carregar usuário');
      }
    };

    carregar();
  }, [id]);

  const handleSubmit = async (form) => {
    try {
      await updateUsuario(id, form);
      navigate('/gerenciar-usuarios');
    } catch (err) {
      alert('Erro ao atualizar usuário');
    }
  };

  if (!usuario) return <p>Carregando...</p>;

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