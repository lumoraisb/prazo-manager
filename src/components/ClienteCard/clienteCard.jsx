import "./clienteCard.css"

function ClienteCard({ nome, totalContratos, totalRegistros, statusGeral }) {
  return (
    <div className="cliente-card">
      <div className="cliente-card-topo">
        <h3>{nome}</h3>
        <span className="badge-contratos">
          {totalContratos} contrato{totalContratos > 1 ? "s" : ""}
        </span>
      </div>

      <div className="cliente-card-info">
        <p>📄 {statusGeral}</p>
        <p>📋 {totalRegistros} registro{totalRegistros > 1 ? "s" : ""}</p>
      </div>
    </div>
  )
}

export default ClienteCard