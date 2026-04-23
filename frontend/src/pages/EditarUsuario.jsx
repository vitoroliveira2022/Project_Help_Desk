import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getUsuarioById,
  updateUsuario,
} from '../services/usuariosService';

import UsuarioForm from '../components/UsuarioForm';

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getUsuarioById(id);
        setUsuario(data);
      } catch (err) {
        setError('Erro ao carregar usuário');
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, [id]);

  const handleSubmit = async (form) => {
    try {
      await updateUsuario(id, form);
      navigate('/gerenciar-usuarios');
    } catch (err) {
      setError('Erro ao atualizar usuário');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate('/gerenciar-usuarios')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Editar Usuário
        </h2>

        <UsuarioForm
          onSubmit={handleSubmit}
          usuarioEditando={usuario}
        />

        <button
          onClick={() => navigate('/gerenciar-usuarios')}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}