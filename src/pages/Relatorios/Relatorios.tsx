import { useMemo } from 'react';
import { AlertTriangle, CheckCircle, Clock, FileText } from 'lucide-react';

import DashboardLayout from '../../layouts/DashboardLayout';
import AnimatedNumber from '../../components/AnimatedNumber/AnimatedNumber';
import AnimatedBar from '../../components/AnimatedBar/AnimatedBar';
import { useChamados } from '../../contexts/ChamadosContext';

function Relatorios() {
  const { chamados, usuarios, dashboard } = useChamados();

  const priorityCounts = useMemo(() => {
    return {
      alta: chamados.filter((item) => item.prioridade === 'ALTA').length,
      media: chamados.filter((item) => item.prioridade === 'MEDIA').length,
      baixa: chamados.filter((item) => item.prioridade === 'BAIXA').length,
    };
  }, [chamados]);

  const stats = dashboard.stats;
  const slices = dashboard.statusSlices;
  const total = chamados.length || 1;
  const resolved = chamados.filter((item) => item.status === 'RESOLVIDO').length;
  const resolutionRate = Number(
    ((resolved / total) * 100).toFixed(1)
  );

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
          {stats.map((stat) => {
            const Icon =
              stat.id === 'urgent'
                ? AlertTriangle
                : stat.id === 'resolved'
                  ? CheckCircle
                  : stat.id === 'active'
                    ? Clock
                    : FileText;
            const iconClass =
              stat.id === 'urgent'
                ? 'report-icon report-warning'
                : stat.id === 'resolved'
                  ? 'report-icon report-success'
                  : stat.id === 'active'
                    ? 'report-icon report-time'
                    : 'report-icon';
            return (
              <div key={stat.id} className="report-card">
                <div className={iconClass}>
                  <Icon size={21} />
                </div>
                <div className="report-card-body">
                  <div className="report-card-copy">
                    <span>{stat.label}</span>
                    <small>{stat.hint}</small>
                  </div>
                  <strong>
                    <AnimatedNumber value={stat.value} />
                  </strong>
                </div>
              </div>
            );
          })}
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
              {slices.map((slice) => (
                <div key={slice.label} className="report-row">
                  <div>
                    <span>{slice.label}</span>
                    <strong>
                      <AnimatedNumber value={slice.value} />
                    </strong>
                  </div>
                  <div className="report-bar">
                    <AnimatedBar
                      percent={slice.percent}
                      className={`report-bar-fill report-${slice.tone}`}
                    />
                  </div>
                </div>
              ))}
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
                <strong>
                  <AnimatedNumber value={priorityCounts.alta} />
                </strong>
              </div>
              <div className="priority-row">
                <span className="priority-label priority-medium">Média</span>
                <strong>
                  <AnimatedNumber value={priorityCounts.media} />
                </strong>
              </div>
              <div className="priority-row">
                <span className="priority-label priority-low">Baixa</span>
                <strong>
                  <AnimatedNumber value={priorityCounts.baixa} />
                </strong>
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
              <strong>
                <AnimatedNumber
                  value={resolutionRate}
                  decimals={1}
                  suffix="%"
                />
              </strong>
            </div>
            <div>
              <span>Atendimentos ativos</span>
              <strong>
                <AnimatedNumber
                  value={stats.find((item) => item.id === 'active')?.value ?? 0}
                />
              </strong>
            </div>
            <div>
              <span>Chamados urgentes</span>
              <strong>
                <AnimatedNumber
                  value={stats.find((item) => item.id === 'urgent')?.value ?? 0}
                />
              </strong>
            </div>
            <div>
              <span>Total de usuárias</span>
              <strong>
                <AnimatedNumber value={usuarios.length} />
              </strong>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Relatorios;
