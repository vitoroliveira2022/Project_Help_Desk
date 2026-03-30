import { useState, useEffect } from 'react';

export default function ChamadoForm({ onSubmit, initialData = {} }) {

  // estado interno do formulário
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    status: '',
  });

  // se vier dados (edição), preenche o form
  useEffect(() => {
    if (initialData) {
      setForm({
        titulo: initialData.titulo || '',
        descricao: initialData.descricao || '',
        status: initialData.status || '',
      });
    }
  }, []);

  // atualiza campos
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // submit reutilizável
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // vem via props
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="titulo"
        value={form.titulo}
        onChange={handleChange}
        placeholder="Título"
      />

      <input
        name="descricao"
        value={form.descricao}
        onChange={handleChange}
        placeholder="Descrição"
      />

      <input
        name="status"
        value={form.status}
        onChange={handleChange}
        placeholder="Status"
      />

      <button type="submit">Salvar</button>
    </form>
  );
}