import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getUsuarios,
  deleteUsuario,
} from '../services/usuariosService';

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletandoId, setDeletandoId] = useState(null);

  const navigate = useNavigate();

  const carregar = async () => {
    try {
      setLoading(true);
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm('Deseja deletar este usuário?');
    if (!ok) return;

    try {
      setDeletandoId(id);
      await deleteUsuario(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar usuário');
    } finally {
      setDeletandoId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Carregando usuários...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow flex flex-col gap-4">

        <h2 className="text-2xl font-bold mb-4">
          Gerenciar Usuários
        </h2>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => navigate('/usuarios/novo')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Novo Usuário
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Voltar
          </button>
        </div>

        {/* ================= MOBILE (CARDS) ================= */}
        <div className="md:hidden space-y-3">
          {usuarios.length === 0 ? (
            <p className="text-center text-gray-500">
              Nenhum usuário encontrado
            </p>
          ) : (
            usuarios.map((u) => (
              <div
                key={u.id}
                className="bg-gray-50 p-4 rounded-lg shadow"
              >
                <p className="text-xs text-gray-500">ID: {u.id}</p>
                <p className="font-semibold">{u.nome}</p>
                <p className="text-sm text-gray-600">{u.email}</p>
                <p className="text-sm text-blue-500">{u.role}</p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/usuarios/editar/${u.id}`)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(u.id)}
                    disabled={deletandoId === u.id}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                  >
                    {deletandoId === u.id ? '...' : 'Deletar'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ================= DESKTOP (TABELA) ================= */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Nome</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Role</th>
                <th className="text-left p-3">Ações</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-4 text-gray-500"
                  >
                    Nenhum usuário encontrado
                  </td>
                </tr>
              ) : (
                usuarios.map((u) => (
                  <tr
                    key={u.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{u.id}</td>
                    <td className="p-3">{u.nome}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.role}</td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => navigate(`/usuarios/editar/${u.id}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => handleDelete(u.id)}
                        disabled={deletandoId === u.id}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                      >
                        {deletandoId === u.id
                          ? 'Deletando...'
                          : 'Deletar'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}