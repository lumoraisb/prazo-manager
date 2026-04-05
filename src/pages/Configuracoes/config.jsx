import "./config.css"

function Configuracoes({ config, setConfig, contratos }) {

  function toggleConfig(chave) {
    setConfig(prev => ({ ...prev, [chave]: !prev[chave] }))
  }

  function handleSistema(chave, valor) {
    setConfig(prev => ({ ...prev, [chave]: valor }))
  }

  function exportarCSV() {
    const cabecalho = ["Número", "Cliente", "Equipamento", "Data Abertura", "Data Vencimento", "Comercial", "Revalidação"]

    const linhas = contratos.map(c => [
      c.numero,
      c.nome,
      c.equipamento,
      c.dataAbertura || "",
      c.dataVenc,
      c.comercial,
      c.revalidacao || ""
    ])

    const conteudo = [cabecalho, ...linhas]
      .map(linha => linha.map(campo => `"${campo}"`).join(","))
      .join("\n")

    baixarArquivo(conteudo, "contratos.csv", "text/csv")
  }

  function criarBackup() {
    const backup = {
      geradoEm: new Date().toISOString(),
      versao: "1.0",
      dados: {
        contratos,
        configuracoes: config
      }
    }

    const conteudo = JSON.stringify(backup, null, 2)
    baixarArquivo(conteudo, `backup_${new Date().toISOString().slice(0, 10)}.json`, "application/json")
  }

  function baixarArquivo(conteudo, nomeArquivo, tipo) {
    const blob = new Blob([conteudo], { type: tipo })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = nomeArquivo
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <div className="titulo-pagina">
        <h1>Configurações</h1>
        <p>Gerencie as preferências do sistema</p>
      </div>

      <div className="config-card">
        <div className="card-header">
          <span>🔔</span>
          <h2>Notificações</h2>
        </div>
        <p className="card-subtitle">Configure como deseja receber alertas</p>

        <div className="toggle-row">
          <div className="toggle-info">
            <strong>Contratos vencendo</strong>
            <span>Receber alertas quando contratos estão próximos do vencimento</span>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={config.vencendo} onChange={() => toggleConfig("vencendo")} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div className="toggle-info">
            <strong>Contratos vencidos</strong>
            <span>Receber alertas diários de contratos vencidos</span>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={config.vencidos} onChange={() => toggleConfig("vencidos")} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div className="toggle-info">
            <strong>Notificações por e-mail</strong>
            <span>Receber resumos semanais por e-mail</span>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={config.email} onChange={() => toggleConfig("email")} />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="config-card">
        <div className="card-header">
          <span>⚙️</span>
          <h2>Sistema</h2>
        </div>
        <p className="card-subtitle">Configurações gerais do sistema</p>

        <div className="field-group">
          <label>Limite de dias para alerta de vencimento</label>
          <input
            type="number"
            value={config.diasAlerta ?? 30}
            onChange={e => handleSistema("diasAlerta", Number(e.target.value))}
          />
          <p className="field-hint">Contratos serão marcados como "Vencendo" quando estiverem dentro deste período</p>
        </div>

        <div className="field-group">
          <label>Prefixo de numeração de contratos</label>
          <input
            type="text"
            placeholder="AAAA/####"
            value={config.prefixo ?? ""}
            onChange={e => handleSistema("prefixo", e.target.value)}
          />
          <p className="field-hint">Formato atual: Ano/Número sequencial</p>
        </div>
      </div>

      <div className="config-card">
        <div className="card-header">
          <span>🗄️</span>
          <h2>Gerenciamento de Dados</h2>
        </div>
        <p className="card-subtitle">Backup e exportação de dados</p>

        <div className="data-row">
          <div className="data-info">
            <strong>Exportar todos os contratos</strong>
            <span>Baixar todos os dados em formato CSV</span>
          </div>
          <button className="btn-outline" onClick={exportarCSV}>Exportar CSV</button>
        </div>

        <div className="data-row">
          <div className="data-info">
            <strong>Backup do sistema</strong>
            <span>Criar backup completo dos dados</span>
          </div>
          <button className="btn-outline" onClick={criarBackup}>Criar Backup</button>
        </div>
      </div>
    </>
  )
}

export default Configuracoes