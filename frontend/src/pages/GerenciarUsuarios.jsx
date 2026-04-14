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

  if (loading) return <p>Carregando usuários...</p>;

  return (
    <div>
      <h2>Gerenciar Usuários</h2>

      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => navigate('/usuarios/novo')}>
          Novo Usuário
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          style={{ marginLeft: '10px' }}
        >
          Voltar para Dashboard
        </button>
      </div>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Role</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="5">Nenhum usuário encontrado</td>
            </tr>
          ) : (
            usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>

                <td>
                  <button
                    onClick={() => navigate(`/usuarios/editar/${u.id}`)}
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(u.id)}
                    disabled={deletandoId === u.id}
                    style={{ marginLeft: '5px' }}
                  >
                    {deletandoId === u.id ? 'Deletando...' : 'Deletar'}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}