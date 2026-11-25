import {
  LayoutDashboard,
  AlertTriangle,
  Users,
  ClipboardList,
  BarChart3,
  LogOut,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">P</div>
        <div>
          <h2>Planify</h2>
          <span>Monitoramento SOS</span>
        </div>
      </div>

      <p className="sidebar-note">Cuide. Organize. Proteja.</p>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/chamados"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <AlertTriangle size={18} />
          <span>Chamados</span>
        </NavLink>

        <NavLink
          to="/usuarios"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <Users size={18} />
          <span>Usuárias</span>
        </NavLink>

        <NavLink
          to="/atendimentos"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <ClipboardList size={18} />
          <span>Atendimentos</span>
        </NavLink>

        <NavLink
          to="/relatorios"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <BarChart3 size={18} />
          <span>Relatórios</span>
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button type="button" className="sidebar-link" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
