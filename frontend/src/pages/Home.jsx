import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <main className="w-full max-w-md text-center py-10 flex flex-col gap-4 px-6">

        <h1 className="text-3xl font-bold text-blue-600">
          Sistema de Chamados
        </h1>

        <p className="text-gray-600">
          Crie, visualize e gerencie chamados de forma simples e organizada.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">

          <button
            onClick={() => navigate('/login')}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded hover:opacity-90"
          >
            Login
          </button>

          <button
            onClick={() => navigate('/cadastro')}
            className="w-full px-6 py-3 bg-green-500 text-white rounded hover:opacity-90"
          >
            Criar Conta
          </button>

        </div>

      </main>

    </div>
  );
}