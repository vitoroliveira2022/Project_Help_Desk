import { useState, useEffect } from 'react';

export default function TecnicoForm({ onSubmit, tecnicoEditando }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  useEffect(() => {
    if (tecnicoEditando) {
      setForm({
        nome: tecnicoEditando.nome || '',
        email: tecnicoEditando.email || '',
        senha: '', // nunca preencher senha por segurança
      });
    } else {
      setForm({
        nome: '',
        email: '',
        senha: '',
      });
    }
  }, [tecnicoEditando]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>
        {tecnicoEditando ? 'Editar Técnico' : 'Novo Técnico'}
      </h3>

      <input
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="senha"
        type="password"
        placeholder={tecnicoEditando ? "Nova senha (opcional)" : "Senha"}
        value={form.senha}
        onChange={handleChange}
        required={!tecnicoEditando}
      />

      <button type="submit">
        {tecnicoEditando ? 'Atualizar' : 'Criar'}
      </button>
    </form>
  );
}