import { useNavigate } from 'react-router-dom';
import TecnicoForm from '../components/TecnicoForm';
import { createTecnico } from '../services/tecnicosService';

export default function CadastrarTecnico() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createTecnico(data);
      navigate('/gerenciar-tecnicos'); // volta para a listagem
    } catch {
      alert('Erro ao cadastrar técnico');
    }
  };

  return (
    <div>
      <h2>Cadastrar Técnico</h2>
      <TecnicoForm onCadastrar={handleSubmit} />
    </div>
  );
}