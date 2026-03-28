// pages/ErrorPage.jsx
export default function ErrorPage({ mensagem }) {
  return (
    <div>
      <h2>Algo deu errado 😢</h2>
      <p>{mensagem}</p>
    </div>
  );
}