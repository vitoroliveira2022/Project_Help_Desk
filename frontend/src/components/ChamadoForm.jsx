import { useState, useEffect } from 'react';

// recebo a funcao de envio do form, e o objeto initialData (EditarChamado)
export default function ChamadoForm({ onSubmit, initialData = {} }) {

  // estado interno do formulário
  const [data, setData] = useState({
    titulo: '',
    descricao: '',
    status: '',
  });

  // se vier dados (edição), preenche o estado
  useEffect(() => {
    if (initialData) {
      setData({
        titulo: initialData.titulo || '',
        descricao: initialData.descricao || '',
        status: initialData.status || '',
      });
    }
  }, []);

  // atualiza campos
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // submit reutilizável
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data); // aqui que vai executar de fato a função handleSubmit de CadastrarChamado ou EditarChamado
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="titulo"
        value={data.titulo}
        onChange={handleChange}
        placeholder="Título"
      />

      <input
        name="descricao"
        value={data.descricao}
        onChange={handleChange}
        placeholder="Descrição"
      />

      <input
        name="status"
        value={data.status}
        onChange={handleChange}
        placeholder="Status"
      />

      <button type="submit">Salvar</button>
    </form>
  );
}