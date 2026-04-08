import { useNavigate } from 'react-router-dom';
import UsuarioForm from '../components/UsuarioForm';
import { createUsuario } from '../services/usuariosService';

export default function CadastrarUsuarioAdmin() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createUsuario(data);
      navigate('/gerenciar-usuarios'); // volta para a listagem
    } catch {
      alert('Erro ao cadastrar usuário');
    }
  };

  return (
    <div>
      <h2>Cadastrar Usuário</h2>
      <UsuarioForm onCadastrar={handleSubmit} />
    </div>
  );
}