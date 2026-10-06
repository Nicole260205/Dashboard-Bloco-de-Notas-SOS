import { createContext, useContext, useState, type ReactNode } from "react";

import type { Chamado } from "../types/chamado";
import type { Atendimento } from "../types/atendimento";

import { chamadosMock } from "../pages/Chamados/mockChamados";
import { atendimentosMock } from "../pages/Atendimentos/mockAtendimentos";

interface ChamadosContextData {
  chamados: Chamado[];
  atendimentos: Atendimento[];

  assumirAtendimento: (id: number) => void;
  finalizarAtendimento: (id: number) => void;
}

const ChamadosContext = createContext<ChamadosContextData | undefined>(
  undefined,
);

export function ChamadosProvider({ children }: { children: ReactNode }) {
  const [chamados, setChamados] = useState<Chamado[]>(chamadosMock);

  const [atendimentos, setAtendimentos] =
    useState<Atendimento[]>(atendimentosMock);

  function assumirAtendimento(id: number) {
    const chamado = chamados.find((item) => item.id === id);

    if (!chamado) {
      return;
    }

    // Atualiza o chamado
    setChamados((chamadosAtuais) =>
      chamadosAtuais.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "EM_ATENDIMENTO",
              responsavel: "Atendente atual",
            }
          : item,
      ),
    );

    // Verifica se já existe um atendimento para esse chamado
    const atendimentoJaExiste = atendimentos.some(
      (item) => item.chamadoId === id,
    );

    if (atendimentoJaExiste) {
      return;
    }

    // Cria um novo atendimento
    const novoAtendimento: Atendimento = {
      id:
        atendimentos.length > 0
          ? Math.max(...atendimentos.map((item) => item.id)) + 1
          : 1,

      chamadoId: chamado.id,
      nome: chamado.nome,
      responsavel: "Atendente atual",
      inicio: `${chamado.data} às ${chamado.hora}`,
      fim: null,
      status: "EM_ANDAMENTO",
    };

    setAtendimentos((atendimentosAtuais) => [
      ...atendimentosAtuais,
      novoAtendimento,
    ]);
  }

  function finalizarAtendimento(id: number) {
    // Primeiro encontra o atendimento
    const atendimento = atendimentos.find((item) => item.id === id);

    if (!atendimento) {
      return;
    }

    // Atualiza o atendimento
    setAtendimentos((atendimentosAtuais) =>
      atendimentosAtuais.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "FINALIZADO",
              fim: new Date().toLocaleString("pt-BR"),
            }
          : item,
      ),
    );

    // Atualiza o chamado relacionado
    setChamados((chamadosAtuais) =>
      chamadosAtuais.map((chamado) =>
        chamado.id === atendimento.chamadoId
          ? {
              ...chamado,
              status: "RESOLVIDO",
            }
          : chamado,
      ),
    );
  }

  return (
    <ChamadosContext.Provider
      value={{
        chamados,
        atendimentos,
        assumirAtendimento,
        finalizarAtendimento,
      }}
    >
      {children}
    </ChamadosContext.Provider>
  );
}

export function useChamados() {
  const context = useContext(ChamadosContext);

  if (!context) {
    throw new Error("useChamados deve ser usado dentro de ChamadosProvider");
  }

  return context;
}
