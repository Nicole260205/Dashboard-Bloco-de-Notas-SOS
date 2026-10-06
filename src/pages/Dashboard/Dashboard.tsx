import DashboardLayout from "../../layouts/DashboardLayout";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="dashboard">
        <div className="welcome">
          <h2>Bem-vinda à Central de Atendimento</h2>
          <p>Acompanhe os chamados e atendimentos realizados pela central.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Total de chamados</span>
            <strong>128</strong>
          </div>

          <div className="stat-card">
            <span>Chamados urgentes</span>
            <strong>12</strong>
          </div>

          <div className="stat-card">
            <span>Em atendimento</span>
            <strong>7</strong>
          </div>

          <div className="stat-card">
            <span>Resolvidos</span>
            <strong>109</strong>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
