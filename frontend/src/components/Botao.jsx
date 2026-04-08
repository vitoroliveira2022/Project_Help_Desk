export default function Botao({ children, onClick, type = 'button' }) {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
}