import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UsuarioForm from '../components/UsuarioForm';
import { getUsuarioById, updateUsuario } from '../services/usuariosService';

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregar() {
      const data = await getUsuarioById(id);
      setUsuario(data);
    }
    carregar();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await updateUsuario(id, data);
      navigate('/gerenciar-usuarios');
    } catch {
      alert('Erro ao atualizar usuário');
    }
  };

  if (!usuario) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Editar Usuário</h2>
      <UsuarioForm initialData={usuario} onCadastrar={handleSubmit} />
    </div>
  );
}