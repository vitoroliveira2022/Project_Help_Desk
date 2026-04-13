import { useNavigate } from 'react-router-dom';
import { createTecnico } from '../services/tecnicosService';
import TecnicoForm from '../components/TecnicoForm';

export default function CadastrarTecnico() {
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    try {
      await createTecnico(form);
      navigate('/gerenciar-tecnicos');
    } catch (err) {
      console.error(err);
      alert('Erro ao criar técnico');
    }
  };

  return (
    <div>
      <h2>Novo Técnico</h2>

      <TecnicoForm onSubmit={handleSubmit} />

      <button onClick={() => navigate('/gerenciar-tecnicos')}>
        Voltar
      </button>
    </div>
  );
}