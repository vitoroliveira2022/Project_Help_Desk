import { useEffect, useState } from 'react';
import { getUsuarios, deleteUsuario } from '../services/usuariosService';
import { useNavigate } from 'react-router-dom';

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregar() {
      const data = await getUsuarios();
      setUsuarios(data);
    }
    carregar();
  }, []);

  const handleExcluir = async (id) => {
    await deleteUsuario(id);
    setUsuarios((prev) => prev.filter(u => u.id !== id));
  };

  return (
    <div>
      <h2>Gerenciar Usuários</h2>
      <button onClick={() => navigate('/cadastrar-usuario')}>Novo Usuário</button>
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>
            {u.nome} - {u.email}
            <button onClick={() => navigate(`/editar-usuario/${u.id}`)}>Editar</button>
            <button onClick={() => handleExcluir(u.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}