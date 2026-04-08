import { useState, useEffect } from 'react';

export default function TecnicoForm({ onSubmit, initialData = {} }) {
  const [data, setData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  useEffect(() => {
    if (initialData) {
      setData({
        nome: initialData.nome || '',
        email: initialData.email || '',
        senha: '', // sempre vazio
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
        required={!initialData.id}
      />

      <button type="submit">Salvar</button>
    </form>
  );
}