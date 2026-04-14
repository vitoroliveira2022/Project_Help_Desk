import { useState, useEffect } from 'react';

export default function TecnicoForm({
  onSubmit,
  tecnicoEditando,
  disabled = false,
}) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  useEffect(() => {
    if (!tecnicoEditando) {
      setForm({ nome: '', email: '', senha: '' });
      return;
    }

    setForm({
      nome: tecnicoEditando.nome || '',
      email: tecnicoEditando.email || '',
      senha: '',
    });
  }, [tecnicoEditando?.id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
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
        disabled={disabled}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        disabled={disabled}
      />

      <input
        name="senha"
        type="password"
        placeholder={
          tecnicoEditando
            ? 'Nova senha (opcional)'
            : 'Senha'
        }
        value={form.senha}
        onChange={handleChange}
        required={!tecnicoEditando}
        disabled={disabled}
      />

      <button type="submit" disabled={disabled}>
        {disabled
          ? 'Salvando...'
          : tecnicoEditando
          ? 'Atualizar'
          : 'Criar'}
      </button>
    </form>
  );
}