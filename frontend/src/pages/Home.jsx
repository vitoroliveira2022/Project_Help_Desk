import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <main className="max-w-md text-center py-16 flex flex-col gap-10">

        <h1 className="text-3xl font-bold text-blue-600">
          Sistema de Chamados
        </h1>

        <p className="text-gray-600 leading-relaxed">
          Crie, visualize e gerencie chamados de forma simples e organizada.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">

          <button
            onClick={() => navigate('/login')}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"          >
            Login
          </button>

          <button
            onClick={() => navigate('/cadastro')}
            className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"          >
            Criar Conta
          </button>

        </div>

      </main>

    </div>
  );
}