import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, role, loading, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <p>Carregando...</p>;

  if (!user) {
    return (
      <p>
        Não logado.{' '}
        <button onClick={() => navigate('/login')}>Ir para login</button>
      </p>
    );
  }

  if (role === 'ADMIN') {
    return (
      <div>
        <h2>Dashboard Admin</h2>
        <p>Bem-vindo {user.nome}!</p>

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

  if (role === 'TECNICO') {
    return (
      <div>
        <h2>Dashboard Tecnico</h2>
        <p>Bem-vindo {user.nome}!</p>

        <button onClick={() => navigate('/chamados-tecnico')}>
          Ver Chamados
        </button>

        <hr />
        <button onClick={handleLogout}>Sair</button>
      </div>
    );
  }

  if (role === 'USER') {
    return (
      <div>
        <h2>Dashboard Usuário</h2>
        <p>Bem-vindo {user.nome}!</p>

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

  return <p>Role desconhecida: {role}</p>;
}