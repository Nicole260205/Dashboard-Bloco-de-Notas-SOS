export interface Usuario {
  id: number;
  nome: string;
  telefone: string;
  totalChamados: number;
  ultimoChamado: string;
  status: "ATIVA" | "INATIVA";
}
