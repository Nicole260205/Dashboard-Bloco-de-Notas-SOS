export type StatusChamado = "NOVO" | "EM_ATENDIMENTO" | "RESOLVIDO";

export type PrioridadeChamado = "ALTA" | "MEDIA" | "BAIXA";

export interface Chamado {
  id: number;
  nome: string;
  data: string;
  hora: string;
  prioridade: PrioridadeChamado;
  status: StatusChamado;
  responsavel: string | null;
}
