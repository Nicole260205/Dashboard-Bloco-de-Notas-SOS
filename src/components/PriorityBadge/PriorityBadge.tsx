import type { PrioridadeChamado } from "../../types/chamado";

interface PriorityBadgeProps {
  prioridade: PrioridadeChamado;
}

function PriorityBadge({ prioridade }: PriorityBadgeProps) {
  const labels = {
    ALTA: "Alta",
    MEDIA: "Média",
    BAIXA: "Baixa",
  };

  return (
    <span className={`priority-badge priority-${prioridade.toLowerCase()}`}>
      {labels[prioridade]}
    </span>
  );
}

export default PriorityBadge;
