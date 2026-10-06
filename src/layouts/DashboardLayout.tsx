import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-area">
        <Header />

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
