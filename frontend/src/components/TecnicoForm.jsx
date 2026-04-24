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

  // 🔥 mais seguro: reage a objeto inteiro, não só id
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
  }, [tecnicoEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 evita enviar senha vazia no update
    const payload = {
      nome: form.nome,
      email: form.email,
      ...(form.senha ? { senha: form.senha } : {}),
    };

    onSubmit?.(payload);
  };

  const input =
    'w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">

      <h3 className="text-xl font-bold mb-2">
        {tecnicoEditando ? 'Editar Técnico' : 'Novo Técnico'}
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
          tecnicoEditando
            ? 'Nova senha (opcional)'
            : 'Senha'
        }
        value={form.senha}
        onChange={handleChange}
        required={!tecnicoEditando}
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
          : tecnicoEditando
          ? 'Atualizar'
          : 'Criar'}
      </button>
    </form>
  );
}