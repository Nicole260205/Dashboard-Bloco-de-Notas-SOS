import { Search, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { usuariosMock } from "./mockUsuarios";

function Usuarios() {
  const navigate = useNavigate();

  const [busca, setBusca] = useState("");

  const usuariosFiltradas = usuariosMock.filter((usuario) => {
    const termo = busca.toLowerCase();

    return (
      usuario.nome.toLowerCase().includes(termo) ||
      usuario.telefone.includes(termo)
    );
  });

  return (
    <DashboardLayout>
      <div className="inner-page">
        <div className="page-header">
          <div>
            <h2>Usuárias</h2>

            <p>Consulte as usuárias atendidas pela central.</p>
          </div>
        </div>

        <div className="users-toolbar">
          <div className="search-box">
            <Search size={17} />

            <input
              type="text"
              placeholder="Buscar por nome ou telefone..."
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />
          </div>
        </div>

        <div className="table-card">
          <div className="table-header">
            <div>
              <h3>Lista de usuárias</h3>

              <p>Usuárias que possuem registros na central.</p>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Usuária</th>
                  <th>Telefone</th>
                  <th>Chamados</th>
                  <th>Último chamado</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>

              <tbody>
                {usuariosFiltradas.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>
                      <strong>{usuario.nome}</strong>
                    </td>

                    <td>{usuario.telefone}</td>

                    <td>{usuario.totalChamados}</td>

                    <td>{usuario.ultimoChamado}</td>

                    <td>
                      <span className="user-status">
                        {usuario.status === "ATIVA" ? "Ativa" : "Inativa"}
                      </span>
                    </td>

                    <td>
                      <button
                        className="table-action"
                        onClick={() => navigate(`/usuarios/${usuario.id}`)}
                      >
                        <Eye size={16} />
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {usuariosFiltradas.length === 0 && (
              <div className="table-empty">
                <p>Nenhuma usuária encontrada.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Usuarios;
