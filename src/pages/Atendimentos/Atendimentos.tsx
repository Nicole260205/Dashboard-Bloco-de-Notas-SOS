import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import StatusBadge from "../../components/StatusBadge/StatusBadge";

import { useChamados } from "../../contexts/ChamadosContext";

function Atendimentos() {
  const navigate = useNavigate();

  const { atendimentos } = useChamados();

  const emAndamento = atendimentos.filter(
    (atendimento) => atendimento.status === "EM_ANDAMENTO",
  ).length;

  const finalizados = atendimentos.filter(
    (atendimento) => atendimento.status === "FINALIZADO",
  ).length;

  return (
    <DashboardLayout>
      <div className="inner-page">
        {/* CABEÇALHO */}

        <div className="page-header">
          <div>
            <h2>Atendimentos</h2>

            <p>Acompanhe os atendimentos em andamento e finalizados.</p>
          </div>
        </div>

        {/* CARDS */}

        <div className="stats-grid">
          <div className="stat-card">
            <span>Em andamento</span>

            <strong>{emAndamento}</strong>
          </div>

          <div className="stat-card">
            <span>Finalizados</span>

            <strong>{finalizados}</strong>
          </div>

          <div className="stat-card">
            <span>Total de atendimentos</span>

            <strong>{atendimentos.length}</strong>
          </div>
        </div>

        {/* TABELA */}

        <div className="table-card">
          <div className="table-header">
            <div>
              <h3>Lista de atendimentos</h3>

              <p>Histórico dos atendimentos realizados pela central.</p>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Atendimento</th>
                  <th>Chamado</th>
                  <th>Usuária</th>
                  <th>Responsável</th>
                  <th>Início</th>
                  <th>Fim</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>

              <tbody>
                {atendimentos.map((atendimento) => (
                  <tr key={atendimento.id}>
                    <td>
                      <strong>
                        #{String(atendimento.id).padStart(3, "0")}
                      </strong>
                    </td>

                    <td>#{String(atendimento.chamadoId).padStart(3, "0")}</td>

                    <td>{atendimento.nome}</td>

                    <td>{atendimento.responsavel}</td>

                    <td>{atendimento.inicio}</td>

                    <td>{atendimento.fim || "—"}</td>

                    <td>
                      <StatusBadge
                        status={
                          atendimento.status === "EM_ANDAMENTO"
                            ? "EM_ATENDIMENTO"
                            : "RESOLVIDO"
                        }
                      />
                    </td>

                    <td>
                      <button
                        className="table-action"
                        title="Visualizar atendimento"
                        onClick={() =>
                          navigate(`/atendimentos/${atendimento.id}`)
                        }
                      >
                        <Eye size={16} />
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Atendimentos;
