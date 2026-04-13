import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTecnicos, deleteTecnico } from '../services/tecnicosService';

export default function GerenciarTecnicos() {
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const carregar = async () => {
    try {
      setLoading(true);
      const data = await getTecnicos();
      setTecnicos(data);
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
    if (!confirm('Deseja deletar este técnico?')) return;

    try {
      await deleteTecnico(id);
      setTecnicos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar técnico');
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Gerenciar Técnicos</h2>

      {/* BOTÃO NOVO */}
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => navigate('/tecnicos/novo')}>
          Novo Técnico
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          style={{ marginLeft: '10px' }}
        >
          Voltar para Dashboard
        </button>
      </div>

      {/* TABELA */}
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
                  <button
                    onClick={() =>
                      navigate(`/tecnicos/editar/${t.id}`)
                    }
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(t.id)}
                    style={{ marginLeft: '5px' }}
                  >
                    Deletar
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