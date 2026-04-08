import { useEffect, useState } from 'react';
import { getTecnicos, deleteTecnico } from '../services/tecnicosService';
import { useNavigate } from 'react-router-dom';

export default function GerenciarTecnicos() {
  const [tecnicos, setTecnicos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregar() {
      const data = await getTecnicos();
      setTecnicos(data);
    }
    carregar();
  }, []);

  const handleExcluir = async (id) => {
    await deleteTecnico(id);
    setTecnicos((prev) => prev.filter(t => t.id !== id));
  };

  return (
    <div>
      <h2>Gerenciar Técnicos</h2>
      <button onClick={() => navigate('/cadastrar-tecnico')}>Novo Técnico</button>
      <ul>
        {tecnicos.map(t => (
          <li key={t.id}>
            {t.nome} - {t.email}
            <button onClick={() => navigate(`/editar-tecnico/${t.id}`)}>Editar</button>
            <button onClick={() => handleExcluir(t.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}