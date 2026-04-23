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

  // 🔥 reage corretamente quando muda o usuário
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
  }, [usuarioEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...form };

    // 🔥 não envia senha vazia no edit
    if (usuarioEditando && !payload.senha) {
      delete payload.senha;
    }

    onSubmit?.(payload);
  };

  const input =
    'w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <h3 className="text-xl font-bold mb-2">
        {usuarioEditando ? 'Editar Usuário' : 'Novo Usuário'}
      </h3>

      <input
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        required
        disabled={disabled}
        className={input}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        disabled={disabled}
        className={input}
      />

      <input
        name="senha"
        type="password"
        placeholder={
          usuarioEditando
            ? 'Nova senha (opcional)'
            : 'Senha'
        }
        value={form.senha}
        onChange={handleChange}
        required={!usuarioEditando}
        disabled={disabled}
        className={input}
      />

      <button
        type="submit"
        disabled={disabled}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition disabled:opacity-50"
      >
        {disabled
          ? 'Salvando...'
          : usuarioEditando
          ? 'Atualizar'
          : 'Criar'}
      </button>
    </form>
  );
}