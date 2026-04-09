import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { usuario, tecnico, loading, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!usuario && !tecnico) {
    return (
      <p>
        Não logado.{' '}
        <button onClick={() => navigate('/login')}>Ir para login</button>
      </p>
    );
  }

  if (usuario?.tipo === 'ADMIN') {
    return (
      <div>
        <h2>Dashboard Admin</h2>
        <p>Bem-vindo {usuario.nome}!</p>

        <button onClick={() => navigate('/gerenciar-usuarios')}>
          Gerenciar Usuários
        </button>
        <button onClick={() => navigate('/gerenciar-tecnicos')}>
          Gerenciar Técnicos
        </button>
        <button onClick={() => navigate('/chamados')}>
          Ver Chamados
        </button>

        <hr />
        <button onClick={handleLogout}>Sair</button>
      </div>
    );
  }

  if (usuario?.tipo === 'USER') {
    return (
      <div>
        <h2>Dashboard Usuário</h2>
        <p>Bem-vindo {usuario.nome}!</p>

        <button onClick={() => navigate('/chamados')}>
          Meus Chamados
        </button>
        <button onClick={() => navigate('/cadastrar')}>
          Abrir Novo Chamado
        </button>

        <hr />
        <button onClick={handleLogout}>Sair</button>
      </div>
    );
  }

  if (tecnico) {
    return (
      <div>
        <h2>Dashboard Técnico</h2>
        <p>Bem-vindo {tecnico.nome}!</p>

        <button onClick={() => navigate('/chamados')}>
          Chamados Disponíveis
        </button>

        <hr />
        <button onClick={handleLogout}>Sair</button>
      </div>
    );
  }

  return null;
}