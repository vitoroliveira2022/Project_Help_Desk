// Importa funções do React:
// createContext → cria um contexto global
// useContext → permite consumir esse contexto
import { createContext, useContext } from 'react';

// Importa seu hook personalizado (onde está toda lógica dos chamados)
import useChamados from '../hooks/useChamados';


// Cria o contexto (é como um "container global" de dados)
const ChamadosContext = createContext();


// Componente Provider → responsável por "fornecer" os dados para toda a aplicação
export function ChamadosProvider({ children }) {

  // Executa o hook que contém toda lógica e estado (chamados, loading, funções etc.)
  const chamadosData = useChamados();

  return (
    // Provider é quem disponibiliza os dados para todos os componentes filhos
    // value = tudo que estará disponível globalmente
    <ChamadosContext.Provider value={chamadosData}>
      
      {/* children = todos os componentes dentro do Provider (ex: AppRoutes) */}
      {children}
      
    </ChamadosContext.Provider>
  );
}


// Hook personalizado para facilitar o uso do contexto
export function useChamadosContext() {

  // useContext acessa os dados que estão dentro do Provider
  return useContext(ChamadosContext);
}