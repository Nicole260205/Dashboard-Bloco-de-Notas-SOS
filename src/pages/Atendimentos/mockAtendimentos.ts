import type { Atendimento } from "../../types/atendimento";

export const atendimentosMock: Atendimento[] = [
  {
    id: 1,
    chamadoId: 2,
    nome: "Ana Souza",
    responsavel: "Carolina Mendes",
    inicio: "05/10/2026 às 14:20",
    fim: null,
    status: "EM_ANDAMENTO",
  },
  {
    id: 2,
    chamadoId: 3,
    nome: "Julia Costa",
    responsavel: "Fernanda Alves",
    inicio: "05/10/2026 às 13:55",
    fim: "05/10/2026 às 14:25",
    status: "FINALIZADO",
  },
  {
    id: 3,
    chamadoId: 4,
    nome: "Beatriz Oliveira",
    responsavel: "Carolina Mendes",
    inicio: "05/10/2026 às 13:30",
    fim: "05/10/2026 às 13:58",
    status: "FINALIZADO",
  },
  {
    id: 4,
    chamadoId: 5,
    nome: "Camila Santos",
    responsavel: "Fernanda Alves",
    inicio: "05/10/2026 às 13:05",
    fim: null,
    status: "EM_ANDAMENTO",
  },
];
