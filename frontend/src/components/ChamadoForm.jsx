import { useState, useEffect } from "react";

export default function ChamadoForm({
  onSubmit,
  initialData = null,
  disabled = false,
}) {
  const [data, setData] = useState({
    titulo: "",
    descricao: "",
  });

  // 🔥 agora reage corretamente a mudanças de initialData
  useEffect(() => {
    if (!initialData) return;

    setData({
      titulo: initialData.titulo || "",
      descricao: initialData.descricao || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(data);
  };

  const input =
    "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4 space-y-4">

      <div>
        <input
          name="titulo"
          value={data.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
          disabled={disabled}
          className={input}
        />
      </div>

      <div>
        <textarea
          name="descricao"
          value={data.descricao}
          onChange={handleChange}
          placeholder="Descrição"
          required
          disabled={disabled}
          rows={5}
          className={input}
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition disabled:opacity-50"
      >
        {disabled ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}