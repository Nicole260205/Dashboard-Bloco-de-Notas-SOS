import { AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";

function Relatorios() {
  return (
    <DashboardLayout>
      <div className="inner-page">
        <div className="page-header">
          <div>
            <h2>Relatórios</h2>

            <p>
              Acompanhe indicadores e informações sobre os chamados da central.
            </p>
          </div>
        </div>

        <div className="report-stats">
          <div className="report-card">
            <div className="report-icon">
              <FileText size={21} />
            </div>

            <div>
              <span>Total de chamados</span>
              <strong>128</strong>
              <small>Registrados no período</small>
            </div>
          </div>

          <div className="report-card">
            <div className="report-icon report-warning">
              <AlertTriangle size={21} />
            </div>

            <div>
              <span>Chamados urgentes</span>
              <strong>12</strong>
              <small>Prioridade alta</small>
            </div>
          </div>

          <div className="report-card">
            <div className="report-icon report-success">
              <CheckCircle size={21} />
            </div>

            <div>
              <span>Chamados resolvidos</span>
              <strong>109</strong>
              <small>85,1% do total</small>
            </div>
          </div>

          <div className="report-card">
            <div className="report-icon report-time">
              <Clock size={21} />
            </div>

            <div>
              <span>Em atendimento</span>
              <strong>7</strong>
              <small>Atendimentos ativos</small>
            </div>
          </div>
        </div>

        <div className="reports-grid">
          <section className="report-panel">
            <div className="report-panel-header">
              <div>
                <h3>Chamados por status</h3>
                <p>Distribuição dos chamados registrados.</p>
              </div>
            </div>

            <div className="status-report">
              <div className="report-row">
                <div>
                  <span>Novo</span>
                  <strong>12</strong>
                </div>

                <div className="report-bar">
                  <div
                    className="report-bar-fill report-new"
                    style={{ width: "9%" }}
                  />
                </div>
              </div>

              <div className="report-row">
                <div>
                  <span>Em atendimento</span>
                  <strong>7</strong>
                </div>

                <div className="report-bar">
                  <div
                    className="report-bar-fill report-progress"
                    style={{ width: "6%" }}
                  />
                </div>
              </div>

              <div className="report-row">
                <div>
                  <span>Resolvidos</span>
                  <strong>109</strong>
                </div>

                <div className="report-bar">
                  <div
                    className="report-bar-fill report-done"
                    style={{ width: "85%" }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="report-panel">
            <div className="report-panel-header">
              <div>
                <h3>Chamados por prioridade</h3>
                <p>Distribuição conforme o nível de prioridade.</p>
              </div>
            </div>

            <div className="priority-report">
              <div className="priority-row">
                <span className="priority-label priority-high">Alta</span>

                <strong>12</strong>
              </div>

              <div className="priority-row">
                <span className="priority-label priority-medium">Média</span>

                <strong>46</strong>
              </div>

              <div className="priority-row">
                <span className="priority-label priority-low">Baixa</span>

                <strong>70</strong>
              </div>
            </div>
          </section>
        </div>

        <section className="report-panel report-summary">
          <div className="report-panel-header">
            <div>
              <h3>Resumo operacional</h3>

              <p>Visão geral da operação da central no período atual.</p>
            </div>
          </div>

          <div className="summary-grid">
            <div>
              <span>Taxa de resolução</span>
              <strong>85,1%</strong>
            </div>

            <div>
              <span>Atendimentos ativos</span>
              <strong>7</strong>
            </div>

            <div>
              <span>Chamados urgentes</span>
              <strong>12</strong>
            </div>

            <div>
              <span>Total de usuárias</span>
              <strong>6</strong>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Relatorios;
