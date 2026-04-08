import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { usuario, tecnico } = useAuthContext();
  const navigate = useNavigate();

  console.log(usuario);
console.log(tecnico);

  if (!usuario && !tecnico) {
    return (
      <p>
        Não logado.{' '}
        <button onClick={() => navigate('/login')}>Ir para login</button>
      </p>
    );
  }

  // ADMIN
  if (usuario?.tipo === 'ADMIN') {
    return (
      <div>
        <h2>Dashboard Admin</h2>
        <p>
          Bem-vindo {usuario.nome}! Você pode gerenciar todos os usuários,
          técnicos e chamados.
        </p>
        <button onClick={() => navigate('/gerenciar-usuarios')}>
          Gerenciar Usuários
        </button>
        <button onClick={() => navigate('/gerenciar-tecnicos')}>
          Gerenciar Técnicos
        </button>
        <button onClick={() => navigate('/chamados')}>Ver Chamados</button>
      </div>
    );
  }

  // USER
  if (usuario?.tipo === 'USER') {
    return (
      <div>
        <h2>Dashboard Usuário</h2>
        <p>
          Bem-vindo {usuario.nome}! Aqui você pode abrir, consultar e gerenciar
          seus chamados.
        </p>
        <button onClick={() => navigate('/chamados')}>Meus Chamados</button>
        <button onClick={() => navigate('/cadastrar')}>Abrir Novo Chamado</button>
      </div>
    );
  }

  // TÉCNICO
  if (tecnico) {
    return (
      <div>
        <h2>Dashboard Técnico</h2>
        <p>
          Bem-vindo {tecnico.nome}! Aqui você pode assumir e gerenciar chamados
          disponíveis.
        </p>
        <button onClick={() => navigate('/chamados')}>Chamados Disponíveis</button>
      </div>
    );
  }

  return null;
}