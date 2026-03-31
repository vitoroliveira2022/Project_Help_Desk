// createContext → cria um contexto global
// useContext → permite consumir esse contexto
import { createContext, useContext } from 'react';

// Importa seu hook personalizado (onde está toda lógica dos chamados)
import useChamados from '../hooks/useChamados';


// Cria o contexto (é como um "container global" de dados)
const ChamadosContext = createContext();

// ChamadosProvider fornece os dados para toda a aplicação
export function ChamadosProvider({ children }) { // children = todos os componentes dentro do Provider (AppRoutes)

  // Executa o hook que contém toda lógica e estado (chamados, loading, funções etc.)
  const chamadosData = useChamados();

  return (
   
    // Provider disponibiliza o "value" (chamadosData) para todos os componentes filhos
    <ChamadosContext.Provider value={chamadosData}>
      
      {/* children = todos os componentes dentro do Provider (AppRoutes) */}
      {children}
      
    </ChamadosContext.Provider>
  );
}


// Hook para acessar os dados do contexto em qualquer componente
export function useChamadosContext() {
  // useContext consome o "value" fornecido pelo Provider (ChamadosContext)
  return useContext(ChamadosContext);
}