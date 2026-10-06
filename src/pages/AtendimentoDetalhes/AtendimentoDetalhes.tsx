import { ArrowLeft, Clock, FileText, User } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useChamados } from "../../contexts/ChamadosContext";

function AtendimentoDetalhes() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { atendimentos } = useChamados();

  const atendimento = atendimentos.find((item) => item.id === Number(id));

  if (!atendimento) {
    return (
      <DashboardLayout>
        <div className="empty-page">
          <h3>Atendimento não encontrado</h3>

          <p>Não foi possível encontrar o atendimento solicitado.</p>

          <button
            className="back-button"
            onClick={() => navigate("/atendimentos")}
          >
            <ArrowLeft size={17} />
            Voltar para atendimentos
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="details-page">
        {/* VOLTAR */}

        <button className="back-link" onClick={() => navigate("/atendimentos")}>
          <ArrowLeft size={17} />
          Voltar para atendimentos
        </button>

        {/* CABEÇALHO */}

        <div className="details-header">
          <div>
            <span className="details-id">
              ATENDIMENTO #{String(atendimento.id).padStart(3, "0")}
            </span>

            <h2>{atendimento.nome}</h2>

            <p>
              Relacionado ao chamado #
              {String(atendimento.chamadoId).padStart(3, "0")}
            </p>
          </div>

          <div>
            {atendimento.status === "EM_ANDAMENTO" ? (
              <span className="status-badge status-atendimento">
                Em atendimento
              </span>
            ) : (
              <span className="status-badge status-resolvido">Finalizado</span>
            )}
          </div>
        </div>

        {/* INFORMAÇÕES */}

        <div className="details-grid">
          {/* DADOS */}

          <section className="details-card">
            <div className="card-title">
              <User size={19} />

              <h3>Dados do atendimento</h3>
            </div>

            <div className="info-list">
              <div className="info-item">
                <span>Usuária</span>

                <strong>{atendimento.nome}</strong>
              </div>

              <div className="info-item">
                <span>Chamado relacionado</span>

                <strong>
                  #{String(atendimento.chamadoId).padStart(3, "0")}
                </strong>
              </div>

              <div className="info-item">
                <span>Responsável</span>

                <strong>{atendimento.responsavel}</strong>
              </div>
            </div>
          </section>

          {/* HORÁRIOS */}

          <section className="details-card">
            <div className="card-title">
              <Clock size={19} />

              <h3>Controle de horário</h3>
            </div>

            <div className="info-list">
              <div className="info-item">
                <span>Início</span>

                <strong>{atendimento.inicio}</strong>
              </div>

              <div className="info-item">
                <span>Fim</span>

                <strong>{atendimento.fim || "Em andamento"}</strong>
              </div>
            </div>
          </section>

          {/* OBSERVAÇÕES */}

          <section className="details-card details-full-card">
            <div className="card-title">
              <FileText size={19} />

              <h3>Observações do atendimento</h3>
            </div>

            <div className="observation-box">
              <p>
                Atendimento realizado pela central. As informações detalhadas da
                ocorrência poderão ser registradas pela responsável durante o
                atendimento.
              </p>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AtendimentoDetalhes;
