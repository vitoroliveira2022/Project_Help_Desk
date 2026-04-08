export default function ChamadoItem({ chamado, onEditar, onRemover }) {
  return (
    <li>
      <strong>{chamado.titulo}</strong> - {chamado.descricao} ({chamado.status})
      <button onClick={() => onEditar(chamado.id)}>Editar</button>
      <button onClick={() => onRemover(chamado.id)}>Excluir</button>
    </li>
  );
}