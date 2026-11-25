import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock3,
  ArrowRight,
} from 'lucide-react';

import DashboardLayout from '../../layouts/DashboardLayout';
import AnimatedNumber from '../../components/AnimatedNumber/AnimatedNumber';
import AnimatedBar from '../../components/AnimatedBar/AnimatedBar';
import TicketsByDayChart from '../../components/TicketsByDayChart/TicketsByDayChart';
import { useChamados } from '../../contexts/ChamadosContext';

const toneIcon = {
  neutral: ClipboardList,
  danger: AlertTriangle,
  warning: Clock3,
  success: CheckCircle2,
} as const;

function Dashboard() {
  const navigate = useNavigate();
  const { dashboard, isLoading, errorMessage, refreshAll } = useChamados();

  const urgentCount = useMemo(
    () => dashboard.stats.find((item) => item.id === 'urgent')?.value ?? 0,
    [dashboard.stats]
  );

  const weekTotal = useMemo(
    () =>
      dashboard.ticketsByDay.reduce((sum, point) => sum + point.total, 0),
    [dashboard.ticketsByDay]
  );

  return (
    <DashboardLayout>
      <div className="dashboard">
        {errorMessage ? (
          <div className="empty-page">
            <h3>Falha ao carregar a central</h3>
            <p>{errorMessage}</p>
            <button
              type="button"
              className="back-button"
              onClick={() => void refreshAll()}
            >
              Tentar novamente
            </button>
          </div>
        ) : null}

        <section className="dash-hero">
          <div className="dash-hero-copy">
            <p className="handwritten">Pequenos passos, grandes cuidados</p>
            <h2>Central de monitoramento Planify</h2>
            <p>
              Acompanhe alertas de emergência enviados pelo app, atendimentos
              ativos e o status geral da rede de usuárias.
            </p>
          </div>
          <div className="dash-hero-aside">
            <span>Alertas altos agora</span>
            <strong>
              {isLoading ? '—' : <AnimatedNumber value={urgentCount} />}
            </strong>
            <button
              type="button"
              className="dash-link-button"
              onClick={() => navigate('/chamados')}
            >
              Ver chamados
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <section className="stats-grid">
          {dashboard.stats.map((stat) => {
            const Icon = toneIcon[stat.tone];
            return (
              <article key={stat.id} className={`stat-card tone-${stat.tone}`}>
                <div className="stat-card-top">
                  <span>{stat.label}</span>
                  <div className="stat-icon">
                    <Icon size={18} />
                  </div>
                </div>
                <strong>
                  {isLoading ? '—' : <AnimatedNumber value={stat.value} />}
                </strong>
                <small>{stat.hint}</small>
              </article>
            );
          })}
        </section>

        <section className="dash-grid">
          <article className="panel-card">
            <div className="panel-header">
              <div>
                <h3>Chamados por dia</h3>
                <p>Volume dos últimos 7 dias. Passe o mouse para ver detalhes.</p>
              </div>
              <div className="panel-metric">
                <span>Total na semana</span>
                <strong>
                  {isLoading ? '—' : <AnimatedNumber value={weekTotal} />}
                </strong>
              </div>
            </div>

            <TicketsByDayChart points={dashboard.ticketsByDay} />
          </article>

          <article className="panel-card">
            <div className="panel-header">
              <div>
                <h3>Distribuição por status</h3>
                <p>Visão rápida do fluxo da central.</p>
              </div>
            </div>

            <div className="status-report">
              {dashboard.statusSlices.map((slice) => (
                <div key={slice.label} className="report-row">
                  <div>
                    <span>{slice.label}</span>
                    <strong>
                      <AnimatedNumber value={slice.value} /> ·{' '}
                      <AnimatedNumber value={slice.percent} suffix="%" />
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

            <div className="activity-block">
              <h4>Atividade recente</h4>
              <ul className="activity-list">
                {dashboard.activity.map((item) => (
                  <li key={item.id}>
                    <span className="activity-dot" />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                      <small>{item.time}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
