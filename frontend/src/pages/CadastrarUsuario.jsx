import { useNavigate } from 'react-router-dom';
import { createUsuario } from '../services/usuariosService';
import UsuarioForm from '../components/UsuarioForm';

export default function CadastrarUsuario() {
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    try {
      await createUsuario(form);
      navigate('/gerenciar-usuarios');
    } catch (err) {
      console.error(err);
      alert('Erro ao criar usuário', err);
    }
  };

  return (
    <div>
      <h2>Novo Usuário</h2>

      <UsuarioForm onSubmit={handleSubmit} />

      <button onClick={() => navigate('/gerenciar-usuarios')}>
        Voltar
      </button>
    </div>
  );
}