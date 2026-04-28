// Função responsável por recuperar o token de autenticação (JWT)
// salvo no localStorage do navegador
export const getToken = () => {

  try {

    // Busca a sessão salva no localStorage
    const session = JSON.parse(localStorage.getItem('session'));

    // Retorna o token se existir dentro da sessão
    // Caso não exista, retorna string vazia
    return session?.token || '';

  } catch {

    // Se der erro ao ler ou converter o JSON (ex: dado corrompido),
    // retorna string vazia para não quebrar a aplicação
    return '';
  }
};