import { Bell, UserCircle } from "lucide-react";

function Header() {
  return (
    <header className="header">
      <div>
        <h1>Dashboard</h1>
        <p>Visão geral da Central de Atendimento</p>
      </div>

      <div className="header-actions">
        <button className="notification-button">
          <Bell size={21} />
          <span className="notification-dot"></span>
        </button>

        <div className="user-info">
          <UserCircle size={36} />

          <div>
            <strong>Atendente</strong>
            <span>Central de Atendimento</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
