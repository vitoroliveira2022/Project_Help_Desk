import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUsuario } from '../services/usuariosService';

export default function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUsuario({ nome, email, senha });
      navigate('/login'); // redireciona para login após criar
    } catch (err) {
      console.error(err);
      setError('Erro ao cadastrar usuário');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
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
      <button type="submit">Cadastrar</button>
    </form>
  );
}