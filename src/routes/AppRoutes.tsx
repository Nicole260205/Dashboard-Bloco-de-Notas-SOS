import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import AtendimentoDetalhes from '../pages/AtendimentoDetalhes/AtendimentoDetalhes';
import Atendimentos from '../pages/Atendimentos/Atendimentos';
import ChamadoDetalhes from '../pages/ChamadoDetalhes/ChamadoDetalhes';
import Chamados from '../pages/Chamados/Chamados';
import Dashboard from '../pages/Dashboard/Dashboard';
import Login from '../pages/Login/Login';
import Relatorios from '../pages/Relatorios/Relatorios';
import UsuarioDetalhes from '../pages/UsuarioDetalhes/UsuarioDetalhes';
import Usuarios from '../pages/Usuarios/Usuarios';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chamados" element={<Chamados />} />
          <Route path="/chamados/:id" element={<ChamadoDetalhes />} />
          <Route path="/atendimentos" element={<Atendimentos />} />
          <Route path="/atendimentos/:id" element={<AtendimentoDetalhes />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/:id" element={<UsuarioDetalhes />} />
          <Route path="/relatorios" element={<Relatorios />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
