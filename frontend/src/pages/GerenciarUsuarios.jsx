import { useEffect, useState } from 'react';
import { getUsuarios, deleteUsuario } from '../services/usuariosService';

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregar = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Deseja deletar este usuário?')) return;

    await deleteUsuario(id);
    carregar();
  };

  useEffect(() => {
    carregar();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Gerenciar Usuários</h2>

      <table border="1">
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
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleDelete(u.id)}>
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}