import {
  LayoutDashboard,
  AlertTriangle,
  Users,
  ClipboardList,
  BarChart3,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <img src="src/assets/taylor.jpg" alt="Logo" className="logo" />
        </div>

        <div>
          <h2>Taylor Swift</h2>
          <span>Central de Atendimento</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/chamados"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <AlertTriangle size={20} />
          <span>Chamados</span>
        </NavLink>

        <NavLink
          to="/usuarios"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Users size={20} />
          <span>Usuárias</span>
        </NavLink>

        <NavLink
          to="/atendimentos"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <ClipboardList size={20} />
          <span>Atendimentos</span>
        </NavLink>

        <NavLink
          to="/relatorios"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <BarChart3 size={20} />
          <span>Relatórios</span>
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button className="sidebar-link">
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
