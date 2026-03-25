import { useState, useEffect } from 'react';

export default function ListarChamados() {
  const [chamados, setChamados] = useState([]);

  useEffect(() => {
    const fetchChamados = async () => {
      const response = await fetch('http://localhost:3000/chamados'); // rota GET /chamados do backend
      const data = await response.json();
      setChamados(data);
    };
    fetchChamados();
  }, []); // [] garante que o fetch só rode uma vez, quando o componente for montado

  return (
    <div>
      <h2>Chamados</h2>
      <ul>
        {chamados.map((chamado) => (
          <li key={chamado.id}>
            <strong>{chamado.titulo}</strong> - {chamado.descricao} (Status: {chamado.status})
          </li>
        ))}
      </ul>
    </div>
  );
}