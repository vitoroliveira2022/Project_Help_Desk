import { useState, useEffect } from 'react';

export default function UsuarioForm({ onSubmit, usuarioEditando }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  // 🧠 Preenche apenas os campos necessários
  useEffect(() => {
    if (usuarioEditando) {
      setForm({
        nome: usuarioEditando.nome || '',
        email: usuarioEditando.email || '',
        senha: '', // nunca preencher senha por segurança
      });
    } else {
      setForm({
        nome: '',
        email: '',
        senha: '',
      });
    }
  }, [usuarioEditando]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);

    // limpa depois de enviar
    setForm({
      nome: '',
      email: '',
      senha: '',
    });
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
        placeholder="Senha"
        type="password"
        value={form.senha}
        onChange={handleChange}
        required={!usuarioEditando} 
        // senha opcional no update (boa prática)
      />

      <button type="submit">
        {usuarioEditando ? 'Atualizar' : 'Criar'}
      </button>
    </form>
  );
}