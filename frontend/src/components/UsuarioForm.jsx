import { useState, useEffect } from 'react';

export default function UsuarioForm({
  onSubmit,
  usuarioEditando,
  disabled = false,
}) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  // só carrega quando muda o ID do usuário
  useEffect(() => {
    if (!usuarioEditando) {
      setForm({ nome: '', email: '', senha: '' });
      return;
    }

    setForm({
      nome: usuarioEditando.nome || '',
      email: usuarioEditando.email || '',
      senha: '',
    });
  }, [usuarioEditando?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>
        {usuarioEditando ? 'Editar Usuário' : 'Novo Usuário'}
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
          usuarioEditando ? 'Nova senha (opcional)' : 'Senha'
        }
        value={form.senha}
        onChange={handleChange}
        required={!usuarioEditando}
        disabled={disabled}
      />

      <button type="submit" disabled={disabled}>
        {disabled
          ? 'Salvando...'
          : usuarioEditando
          ? 'Atualizar'
          : 'Criar'}
      </button>
    </form>
  );
}