import { useNavigate } from 'react-router-dom';
import { useChamadosContext } from '../context/ChamadosContext';
import ChamadoForm from '../components/ChamadoForm';

export default function CadastrarChamado() {
  const { adicionarChamado } = useChamadosContext();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await adicionarChamado(data);
    navigate('/');
  };

  return (
    // estou passando via props a funcao de envio de formulario para meu form
    <>
      <ChamadoForm onSubmit={handleSubmit} />
    </>

  ) 
    
}

/*
Resumo do fluxo
Usuário envia formulário → handleSubmit
handleSubmit chama adicionarChamado(data) via contexto
Hook (useChamados) chama service → API
API retorna os dados → hook atualiza chamados no contexto
await termina → handleSubmit continua → navigate('/')
Página de listagem renderiza, mostrando o chamado recém-adicionado
*/