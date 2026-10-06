import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Chamados from "../pages/Chamados/Chamados";
import Atendimentos from "../pages/Atendimentos/Atendimentos";
import Usuarios from "../pages/Usuarios/Usuarios";
import Relatorios from "../pages/Relatorios/Relatorios";
import ChamadoDetalhes from "../pages/ChamadoDetalhes/ChamadoDetalhes";
import AtendimentoDetalhes from "../pages/AtendimentoDetalhes/AtendimentoDetalhes";
import UsuarioDetalhes from "../pages/UsuarioDetalhes/UsuarioDetalhes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/chamados" element={<Chamados />} />

        <Route path="/chamados/:id" element={<ChamadoDetalhes />} />

        <Route path="/atendimentos" element={<Atendimentos />} />

        <Route path="/atendimentos/:id" element={<AtendimentoDetalhes />} />

        <Route path="/usuarios" element={<Usuarios />} />

        <Route path="/usuarios/:id" element={<UsuarioDetalhes />} />

        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
