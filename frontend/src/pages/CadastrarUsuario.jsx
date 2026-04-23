import { useNavigate } from 'react-router-dom';
import { createUsuario } from '../services/usuariosService';
import UsuarioForm from '../components/UsuarioForm';
import { useState } from 'react';

export default function CadastrarUsuario() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (form) => {
    try {
      setLoading(true);
      setError(null);

      await createUsuario(form);

      navigate('/gerenciar-usuarios');
    } catch (err) {
      console.error(err);
      setError('Erro ao criar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Novo Usuário
        </h2>

        {error && (
          <p className="mb-4 text-red-500 text-sm">
            {error}
          </p>
        )}

        <UsuarioForm
          onSubmit={handleSubmit}
          disabled={loading}
        />

        <button
          onClick={() => navigate('/gerenciar-usuarios')}
          disabled={loading}
          className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded transition disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Voltar'}
        </button>
      </div>
    </div>
  );
}