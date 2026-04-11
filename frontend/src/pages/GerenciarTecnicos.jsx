import { useEffect, useState } from 'react';
import { getTecnicos, deleteTecnico } from '../services/tecnicosService';

export default function GerenciarTecnicos() {
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregar = async () => {
    try {
      const data = await getTecnicos();
      setTecnicos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Deseja deletar este técnico?')) return;

    await deleteTecnico(id);
    carregar();
  };

  useEffect(() => {
    carregar();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Gerenciar Técnicos</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {tecnicos.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.nome}</td>
              <td>{t.email}</td>
              <td>
                <button onClick={() => handleDelete(t.id)}>
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