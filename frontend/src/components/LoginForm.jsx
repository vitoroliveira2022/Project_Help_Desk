import { useState } from 'react';

export default function LoginForm({ onSubmit }) {
  const [data, setData] = useState({
    email: '',
    senha: '',
  });

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
        required
      />

      <button type="submit">Entrar</button>
    </form>
  );
}