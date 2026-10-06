export type StatusAtendimento = "EM_ANDAMENTO" | "FINALIZADO";

export interface Atendimento {
  id: number;
  chamadoId: number;
  nome: string;
  responsavel: string;
  inicio: string;
  fim: string | null;
  status: StatusAtendimento;
}
