import { useState, useEffect } from "react";

export default function ChamadoForm({
  onSubmit,
  initialData = {},
  disabled = false,
}) {
  const [data, setData] = useState({
    titulo: "",
    descricao: "",
  });

  useEffect(() => {
    if (!initialData) return;

    setData({
      titulo: initialData.titulo || "",
      descricao: initialData.descricao || "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(data);
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
        {disabled ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}