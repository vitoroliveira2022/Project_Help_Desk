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
    <div>
      <h2>Novo Usuário</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <UsuarioForm
        onSubmit={handleSubmit}
        disabled={loading}
      />

      <button
        onClick={() => navigate('/gerenciar-usuarios')}
        disabled={loading}
      >
        {loading ? 'Salvando...' : 'Voltar'}
      </button>
    </div>
  );
}