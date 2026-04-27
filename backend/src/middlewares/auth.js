import jwt from 'jsonwebtoken';

// Middleware de autenticação JWT
// Verifica se o token foi enviado no header Authorization,
// valida o token e adiciona os dados do usuário em req.usuario.
// Se não houver token ou for inválido, retorna 401.
export const auth = (req, res, next) => {

  // Pega o header Authorization: "Bearer token"
  const authHeader = req.headers.authorization;

  // Se não enviou token
  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não enviado' });
  }

  // Extrai apenas o token (remove "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Salva os dados do usuário na requisição
    req.usuario = decoded;

    // Continua para a próxima rota/controller
    next();

  } catch (err) {
    // Token inválido ou expirado
    return res.status(401).json({ erro: 'Token inválido' });
  }
};