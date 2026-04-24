import { useNavigate } from 'react-router-dom';

export default function ErrorPage({ mensagem = 'Erro inesperado' }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center flex flex-col gap-6">

        <h2 className="text-2xl font-bold text-red-500 mb-2">
          Algo deu errado!
        </h2>

        <p className="text-gray-600 mb-6">
          {mensagem}
        </p>

        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded transition"
        >
          Voltar para Dashboard
        </button>
      </div>
    </div>
  );
}