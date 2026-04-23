import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, role, loading, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Carregando...</p>
      </div>
    );

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="mb-4 text-gray-700">Não logado.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Ir para login
          </button>
        </div>
      </div>
    );
  }

  const baseLayout =
    'min-h-screen flex items-center justify-center bg-gray-100';

  const card =
    'bg-white p-8 flex flex-col gap-4 rounded-xl shadow-md w-full max-w-md text-center';

  const button =
    'w-full py-2 px-4 rounded text-white font-medium transition mb-2';

  const logoutBtn =
    'w-full py-2 px-4 rounded bg-red-500 hover:bg-red-600 text-white mt-4';

  if (role === 'ADMIN') {
    return (
      <div className={baseLayout}>
        <div className={card}>
          <h2 className="text-2xl font-bold mb-2">Dashboard Admin</h2>
          <p className="mb-4 text-gray-600">
            Bem-vindo {user.nome}!
          </p>

          <button
            onClick={() => navigate('/gerenciar-usuarios')}
            className={`${button} bg-blue-500 hover:bg-blue-600`}
          >
            Gerenciar Usuários
          </button>

          <button
            onClick={() => navigate('/gerenciar-tecnicos')}
            className={`${button} bg-indigo-500 hover:bg-indigo-600`}
          >
            Gerenciar Técnicos
          </button>

          <button
            onClick={() => navigate('/chamados')}
            className={`${button} bg-green-500 hover:bg-green-600`}
          >
            Ver Chamados
          </button>

          <button onClick={handleLogout} className={logoutBtn}>
            Sair
          </button>
        </div>
      </div>
    );
  }

  if (role === 'TECNICO') {
    return (
      <div className={baseLayout}>
        <div className={card}>
          <h2 className="text-2xl font-bold mb-2">
            Dashboard Técnico
          </h2>
          <p className="mb-4 text-gray-600">
            Bem-vindo {user.nome}!
          </p>

          <button
            onClick={() => navigate('/chamados-tecnico')}
            className={`${button} bg-yellow-500 hover:bg-yellow-600`}
          >
            Chamados Pendentes
          </button>

          <button
            onClick={() => navigate('/chamados-resolvidos')}
            className={`${button} bg-green-500 hover:bg-green-600`}
          >
            Chamados Resolvidos
          </button>

          <button onClick={handleLogout} className={logoutBtn}>
            Sair
          </button>
        </div>
      </div>
    );
  }

  if (role === 'USER') {
    return (
      <div className={baseLayout}>
        <div className={card}>
          <h2 className="text-2xl font-bold mb-2">
            Dashboard Usuário
          </h2>
          <p className="mb-4 text-gray-600">
            Bem-vindo {user.nome}!
          </p>

          <button
            onClick={() => navigate('/chamados')}
            className={`${button} bg-blue-500 hover:bg-blue-600`}
          >
            Meus Chamados
          </button>

          <button
            onClick={() => navigate('/cadastrar')}
            className={`${button} bg-purple-500 hover:bg-purple-600`}
          >
            Abrir Novo Chamado
          </button>

          <button onClick={handleLogout} className={logoutBtn}>
            Sair
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-red-500">
        Role desconhecida: {role}
      </p>
    </div>
  );
}