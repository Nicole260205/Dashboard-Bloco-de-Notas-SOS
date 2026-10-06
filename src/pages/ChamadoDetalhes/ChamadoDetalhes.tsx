import { ArrowLeft, MapPin, Phone, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import PriorityBadge from "../../components/PriorityBadge/PriorityBadge";

import { useChamados } from "../../contexts/ChamadosContext";

function ChamadoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { chamados, assumirAtendimento, finalizarAtendimento } = useChamados();

  const chamado = chamados.find((item) => item.id === Number(id));

  if (!chamado) {
    return (
      <DashboardLayout>
        <div className="empty-page">
          <h3>Chamado não encontrado</h3>

          <p>Não foi possível encontrar o chamado solicitado.</p>

          <button className="back-button" onClick={() => navigate("/chamados")}>
            <ArrowLeft size={17} />
            Voltar para chamados
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="details-page">
        {/* VOLTAR */}
        <button className="back-link" onClick={() => navigate("/chamados")}>
          <ArrowLeft size={17} />
          Voltar para chamados
        </button>

        {/* CABEÇALHO */}
        <div className="details-header">
          <div>
            <span className="details-id">
              CHAMADO #{String(chamado.id).padStart(3, "0")}
            </span>

            <h2>{chamado.nome}</h2>

            <p>
              Recebido em {chamado.data} às {chamado.hora}
            </p>
          </div>

          <div className="details-badges">
            <PriorityBadge prioridade={chamado.prioridade} />

            <StatusBadge status={chamado.status} />
          </div>
        </div>

        {/* AÇÕES */}
        <div className="details-actions">
          {chamado.status === "NOVO" && (
            <button
              className="primary-action"
              onClick={() => assumirAtendimento(chamado.id)}
            >
              Assumir atendimento
            </button>
          )}

          {chamado.status === "EM_ATENDIMENTO" && (
            <button
              className="success-action"
              onClick={() => finalizarAtendimento(chamado.id)}
            >
              Finalizar atendimento
            </button>
          )}
        </div>

        {/* INFORMAÇÕES */}
        <div className="details-grid">
          {/* DADOS DA SOLICITANTE */}
          <section className="details-card">
            <div className="card-title">
              <User size={19} />
              <h3>Dados da solicitante</h3>
            </div>

            <div className="info-list">
              <div className="info-item">
                <span>Nome</span>
                <strong>{chamado.nome}</strong>
              </div>

              <div className="info-item">
                <span>Telefone</span>
                <strong>(61) 99999-0000</strong>
              </div>
            </div>
          </section>

          {/* INFORMAÇÕES DO CHAMADO */}
          <section className="details-card">
            <div className="card-title">
              <Phone size={19} />
              <h3>Informações do chamado</h3>
            </div>

            <div className="info-list">
              <div className="info-item">
                <span>Data</span>
                <strong>{chamado.data}</strong>
              </div>

              <div className="info-item">
                <span>Horário</span>
                <strong>{chamado.hora}</strong>
              </div>

              <div className="info-item">
                <span>Responsável</span>

                <strong>{chamado.responsavel || "Não atribuído"}</strong>
              </div>
            </div>
          </section>

          {/* LOCALIZAÇÃO */}
          <section className="details-card location-card">
            <div className="card-title">
              <MapPin size={19} />
              <h3>Localização</h3>
            </div>

            <div className="location-placeholder">
              <MapPin size={32} />

              <strong>Localização do chamado</strong>

              <span>Brasília, Distrito Federal</span>

              <small>
                Latitude: -15.7939 &nbsp;|&nbsp; Longitude: -47.8828
              </small>
            </div>
          </section>

          {/* HISTÓRICO */}
          <section className="details-card history-card">
            <div className="card-title">
              <h3>Histórico do chamado</h3>
            </div>

            <div className="history">
              {/* CHAMADO RECEBIDO */}
              <div className="history-item">
                <div className="history-dot"></div>

                <div>
                  <strong>Chamado recebido</strong>

                  <p>Solicitação registrada na central.</p>

                  <span>
                    {chamado.data} às {chamado.hora}
                  </span>
                </div>
              </div>

              {/* ATENDIMENTO INICIADO */}
              {chamado.status !== "NOVO" && (
                <div className="history-item">
                  <div className="history-dot"></div>

                  <div>
                    <strong>Atendimento iniciado</strong>

                    <p>Chamado encaminhado para a equipe responsável.</p>

                    <span>{chamado.data} às 14:40</span>
                  </div>
                </div>
              )}

              {/* CHAMADO RESOLVIDO */}
              {chamado.status === "RESOLVIDO" && (
                <div className="history-item">
                  <div className="history-dot"></div>

                  <div>
                    <strong>Chamado resolvido</strong>

                    <p>Atendimento finalizado pela equipe.</p>

                    <span>{chamado.data} às 15:20</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ChamadoDetalhes;
