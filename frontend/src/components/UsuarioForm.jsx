import { useState, useEffect } from 'react';

export default function UsuarioForm({ onSubmit, initialData = {} }) {
  const [data, setData] = useState({
    nome: '',
    email: '',
    senha: '',
    role: 'USER',
  });

  useEffect(() => {
    if (initialData) {
      setData({
        nome: initialData.nome || '',
        email: initialData.email || '',
        senha: '', // não preenche a senha para segurança
        role: initialData.role || 'USER',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nome"
        value={data.nome}
        onChange={handleChange}
        placeholder="Nome"
        required
      />

      <input
        name="email"
        type="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <input
        name="senha"
        type="password"
        value={data.senha}
        onChange={handleChange}
        placeholder="Senha"
        required={!initialData.id} // senha obrigatória só se for criar
      />

      <select name="role" value={data.role} onChange={handleChange}>
        <option value="USER">Usuário</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button type="submit">Salvar</button>
    </form>
  );
}