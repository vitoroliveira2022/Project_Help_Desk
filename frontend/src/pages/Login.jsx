import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, senha }); 
      navigate('/dashboard'); // Dashboard detecta automaticamente USER, ADMIN ou TECNICO
    } catch (err) {
      console.error(err);
      setError('Email ou senha inválidos');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}