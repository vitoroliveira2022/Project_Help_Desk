import { useState } from 'react';

export default function CadastrarChamado() {

   const  [titulo, setTitulo] = useState('');
   const [descricao, setDescricao] = useState('');
   const [status, setStatus] = useState('');

  const enviarForm = async (e) => {
    e.preventDefault();
    const novoChamado = { titulo, descricao, status };
    
    await fetch('http://localhost:3000/chamados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoChamado),
    });
    
    // limpando os campos do formulário
    setStatus('');
    setTitulo('');
    setDescricao('');
  };

  return (
    <form onSubmit={enviarForm}>
        <div>
            <label>Título:</label>
            <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            />
        </div>

        <div>
            <label>Descrição:</label>
            <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            />
        </div>

        <div>
            <label>Status:</label>
            <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            />
        </div>

        <button type="submit">Cadastrar chamado</button>
    </form>
  );
}
