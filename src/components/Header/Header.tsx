import { Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': {
    title: 'Dashboard',
    subtitle: 'Visão geral da central de emergência',
  },
  '/chamados': {
    title: 'Chamados',
    subtitle: 'Solicitações recebidas pelo Planify',
  },
  '/usuarios': {
    title: 'Usuárias',
    subtitle: 'Pessoas cadastradas na rede de proteção',
  },
  '/atendimentos': {
    title: 'Atendimentos',
    subtitle: 'Histórico e ações da equipe',
  },
  '/relatorios': {
    title: 'Relatórios',
    subtitle: 'Indicadores e desempenho da central',
  },
};

function Header() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const basePath = `/${pathname.split('/')[1] || 'dashboard'}`;
  const meta = pageMeta[basePath] ?? {
    title: 'Planify',
    subtitle: 'Central de monitoramento',
  };
  const displayName = user?.fullName?.trim() || user?.username || 'Atendente';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <header className="header">
      <div>
        <h1>{meta.title}</h1>
        <p>{meta.subtitle}</p>
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="notification-button"
          aria-label="Notificações"
        >
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        <div className="user-info">
          <div className="user-avatar">{initials || 'AD'}</div>
          <div>
            <strong>{displayName}</strong>
            <span>Central Planify</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
