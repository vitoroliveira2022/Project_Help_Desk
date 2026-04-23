import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getUsuarioById,
  updateUsuario,
} from '../services/usuariosService';

import TecnicoForm from '../components/TecnicoForm';

export default function EditarTecnico() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tecnico, setTecnico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getUsuarioById(id);
        setTecnico(data);
      } catch (err) {
        setError('Erro ao carregar técnico');
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, [id]);

  const handleSubmit = async (form) => {
    try {
      await updateUsuario(id, {
        ...form,
        role: 'TECNICO',
      });

      navigate('/gerenciar-tecnicos');
    } catch (err) {
      setError('Erro ao atualizar técnico');
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
            onClick={() => navigate('/gerenciar-tecnicos')}
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
          Editar Técnico
        </h2>

        <TecnicoForm
          onSubmit={handleSubmit}
          tecnicoEditando={tecnico}
        />

        <button
          onClick={() => navigate('/gerenciar-tecnicos')}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}