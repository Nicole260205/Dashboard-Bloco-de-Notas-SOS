import { ArrowLeft, Phone, User, FileText } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { usuariosMock } from "../Usuarios/mockUsuarios";

function UsuarioDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const usuario = usuariosMock.find((item) => item.id === Number(id));

  if (!usuario) {
    return (
      <DashboardLayout>
        <div className="empty-page">
          <h3>Usuária não encontrada</h3>

          <p>Não foi possível encontrar a usuária solicitada.</p>

          <button className="back-button" onClick={() => navigate("/usuarios")}>
            <ArrowLeft size={17} />
            Voltar para usuárias
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="details-page">
        <button className="back-link" onClick={() => navigate("/usuarios")}>
          <ArrowLeft size={17} />
          Voltar para usuárias
        </button>

        <div className="details-header">
          <div>
            <span className="details-id">
              USUÁRIA #{String(usuario.id).padStart(3, "0")}
            </span>

            <h2>{usuario.nome}</h2>

            <p>Cadastro ativo na central.</p>
          </div>

          <span className="user-status">
            {usuario.status === "ATIVA" ? "Ativa" : "Inativa"}
          </span>
        </div>

        <div className="details-grid">
          <section className="details-card">
            <div className="card-title">
              <User size={19} />
              <h3>Dados pessoais</h3>
            </div>

            <div className="info-list">
              <div className="info-item">
                <span>Nome</span>
                <strong>{usuario.nome}</strong>
              </div>

              <div className="info-item">
                <span>Telefone</span>
                <strong>{usuario.telefone}</strong>
              </div>
            </div>
          </section>

          <section className="details-card">
            <div className="card-title">
              <Phone size={19} />
              <h3>Contato</h3>
            </div>

            <div className="info-list">
              <div className="info-item">
                <span>Telefone principal</span>
                <strong>{usuario.telefone}</strong>
              </div>

              <div className="info-item">
                <span>Status</span>
                <strong>
                  {usuario.status === "ATIVA"
                    ? "Cadastro ativo"
                    : "Cadastro inativo"}
                </strong>
              </div>
            </div>
          </section>

          <section className="details-card details-full-card">
            <div className="card-title">
              <FileText size={19} />
              <h3>Histórico</h3>
            </div>

            <div className="info-list">
              <div className="info-item">
                <span>Total de chamados</span>
                <strong>{usuario.totalChamados}</strong>
              </div>

              <div className="info-item">
                <span>Último chamado</span>
                <strong>{usuario.ultimoChamado}</strong>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default UsuarioDetalhes;
