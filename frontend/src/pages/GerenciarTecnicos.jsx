import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsuarios, deleteUsuario } from '../services/usuariosService';

export default function GerenciarTecnicos() {
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletandoId, setDeletandoId] = useState(null);

  const navigate = useNavigate();

  const carregar = async () => {
    try {
      setLoading(true);

      const data = await getUsuarios();

      // 🔥 filtra só técnicos
      const apenasTecnicos = data.filter((u) => u.role === 'TECNICO');

      setTecnicos(apenasTecnicos);
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar técnicos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm('Deseja deletar este técnico?');
    if (!ok) return;

    try {
      setDeletandoId(id);

      await deleteUsuario(id);

      setTecnicos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar técnico');
    } finally {
      setDeletandoId(null);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Gerenciar Técnicos</h2>

      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => navigate('/tecnicos/novo')}>
          Novo Técnico
        </button>

        <button onClick={() => navigate('/dashboard')} style={{ marginLeft: '10px' }}>
          Voltar para Dashboard
        </button>
      </div>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {tecnicos.length === 0 ? (
            <tr>
              <td colSpan="4">Nenhum técnico encontrado</td>
            </tr>
          ) : (
            tecnicos.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.nome}</td>
                <td>{t.email}</td>

                <td>
                  <button onClick={() => navigate(`/tecnicos/editar/${t.id}`)}>
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(t.id)}
                    disabled={deletandoId === t.id}
                    style={{ marginLeft: '5px' }}
                  >
                    {deletandoId === t.id ? 'Deletando...' : 'Deletar'}
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