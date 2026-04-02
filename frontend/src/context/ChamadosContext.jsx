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
  // Quando o Provider é montado (App.jsx), o hook é inicializado, o useEffect do hook é executado (apenas na montagem)
  const chamadosData = useChamados();

  return (
    // Provider disponibiliza o "value" (chamadosData) para todos os componentes filhos
    // chamadosData é o objeto que possui a lista de chamados e as funções
    <ChamadosContext.Provider value={chamadosData}>
      {/* children = todos os componentes dentro do Provider (AppRoutes) */}
      {children}
    </ChamadosContext.Provider>
  );
}

// Hook para consumir o contexto de chamados em qualquer componente da aplicação
export function useChamadosContext() {
  // useContext consome o "value" fornecido pelo Provider (ChamadosContext)
  return useContext(ChamadosContext);
}