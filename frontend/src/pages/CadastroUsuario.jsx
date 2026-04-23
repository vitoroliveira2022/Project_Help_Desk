import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUsuario } from '../services/usuariosService';

export default function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await createUsuario({ nome, email, senha });

      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Erro ao cadastrar usuário');
    } finally {
      setLoading(false);
    }
  };

  const input =
    'w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Cadastro de Usuário
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className={input}
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            className={input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className={input}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition disabled:opacity-50"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <button
          onClick={() => navigate('/login')}
          className="mt-4 w-full text-sm text-gray-500 hover:underline"
        >
          Já tem conta? Fazer login
        </button>
      </div>
    </div>
  );
}