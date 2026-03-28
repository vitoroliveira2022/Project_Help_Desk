// pages/EditarChamado.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChamadoById } from '../services/chamadosService';

export default function EditarChamado({ atualizarChamado }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    status: '',
  });

  useEffect(() => {
    async function carregar() {
      const data = await getChamadoById(id);
      setForm(data);
    }

    carregar();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvar = async (e) => {
    e.preventDefault();

    await atualizarChamado(id, form);
    navigate('/');
  };

  return (
    <form onSubmit={salvar}>
      <input name="titulo" value={form.titulo} onChange={handleChange} />
      <input name="descricao" value={form.descricao} onChange={handleChange} />
      <input name="status" value={form.status} onChange={handleChange} />

      <button type="submit">Atualizar</button>
    </form>
  );
}