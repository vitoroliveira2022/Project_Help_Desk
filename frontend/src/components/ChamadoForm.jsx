import { useState, useEffect } from "react";

export default function ChamadoForm({ onSubmit, initialData = {}, disabled = false }) {
  const [data, setData] = useState({
    titulo: "",
    descricao: "",
  });

  // Preenche campos apenas quando os valores mudam
  useEffect(() => {
    setData({
      titulo: initialData.titulo || "",
      descricao: initialData.descricao || "",
    });
  }, [initialData.titulo, initialData.descricao]); // ✅ disparar só quando os valores mudam

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="titulo"
        value={data.titulo}
        onChange={handleChange}
        placeholder="Título"
        required
        disabled={disabled}
      />

      <textarea
        name="descricao"
        value={data.descricao}
        onChange={handleChange}
        placeholder="Descrição"
        required
        disabled={disabled}
      />

      <button type="submit" disabled={disabled}>
        Salvar
      </button>
    </form>
  );
}