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

  return <ChamadoForm onSubmit={handleSubmit} />;
}