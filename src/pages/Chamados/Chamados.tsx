import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Eye } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import PriorityBadge from "../../components/PriorityBadge/PriorityBadge";

import { useChamados } from "../../contexts/ChamadosContext";  

function Chamados() {
  const navigate = useNavigate();

  const { chamados } = useChamados();

  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("TODOS");
  const [prioridadeFiltro, setPrioridadeFiltro] = useState("TODAS");

  const chamadosFiltrados = chamados.filter((chamado) => {
    const correspondeBusca =
      chamado.nome.toLowerCase().includes(busca.toLowerCase()) ||
      chamado.id.toString().includes(busca);

    const correspondeStatus =
      statusFiltro === "TODOS" || chamado.status === statusFiltro;

    const correspondePrioridade =
      prioridadeFiltro === "TODAS" || chamado.prioridade === prioridadeFiltro;

    return correspondeBusca && correspondeStatus && correspondePrioridade;
  });

  return (
    <DashboardLayout>
      <div className="page-header">
        <div>
          <h2>Chamados</h2>
          <p>Acompanhe todas as solicitações recebidas pela central.</p>
        </div>
      </div>

      <div className="filters-card">
        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Buscar por nome ou ID..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />
        </div>

        <select
          value={statusFiltro}
          onChange={(event) => setStatusFiltro(event.target.value)}
        >
          <option value="TODOS">Todos os status</option>
          <option value="NOVO">Novo</option>
          <option value="EM_ATENDIMENTO">Em atendimento</option>
          <option value="RESOLVIDO">Resolvido</option>
        </select>

        <select
          value={prioridadeFiltro}
          onChange={(event) => setPrioridadeFiltro(event.target.value)}
        >
          <option value="TODAS">Todas as prioridades</option>
          <option value="ALTA">Alta</option>
          <option value="MEDIA">Média</option>
          <option value="BAIXA">Baixa</option>
        </select>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>Chamados recebidos</h3>

          <span>
            {chamadosFiltrados.length}{" "}
            {chamadosFiltrados.length === 1 ? "chamado" : "chamados"}
          </span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Solicitante</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Responsável</th>
                <th>Ação</th>
              </tr>
            </thead>

            <tbody>
              {chamadosFiltrados.map((chamado) => (
                <tr key={chamado.id}>
                  <td>
                    <strong>#{String(chamado.id).padStart(3, "0")}</strong>
                  </td>

                  <td>{chamado.nome}</td>

                  <td>{chamado.data}</td>

                  <td>{chamado.hora}</td>

                  <td>
                    <PriorityBadge prioridade={chamado.prioridade} />
                  </td>

                  <td>
                    <StatusBadge status={chamado.status} />
                  </td>

                  <td>{chamado.responsavel || "Não atribuído"}</td>

                  <td>
                    <button
                      className="view-button"
                      onClick={() => navigate(`/chamados/${chamado.id}`)}
                    >
                      <Eye size={17} />
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {chamadosFiltrados.length === 0 && (
            <div className="no-results">
              <p>Nenhum chamado encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Chamados;
