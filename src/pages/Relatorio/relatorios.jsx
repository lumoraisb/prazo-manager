import "./relatorios.css"

function Relatorios({ contratos }) {
  function calcularDias(dataVenc) {
    const hoje = new Date()
    const vencimento = new Date(dataVenc)
    const diff = vencimento - hoje
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  function verificarStatus(diasVenc) {
    if (diasVenc < 0) return "vencido"
    if (diasVenc <= 30) return "vencendo"
    return "ativo"
  }

  const contratosComStatus = contratos.map((item) => {
    const diasVenc = calcularDias(item.dataVenc)
    const status = verificarStatus(diasVenc)

    return {
      ...item,
      diasVenc,
      status
    }
  })

  const totalContratos = contratosComStatus.length

  const totalAtivos = contratosComStatus.filter(
    (item) => item.status === "ativo"
  ).length

  const totalVencendo = contratosComStatus.filter(
    (item) => item.status === "vencendo"
  ).length

  const totalVencidos = contratosComStatus.filter(
    (item) => item.status === "vencido"
  ).length

  const porcentagem = (valor) => {
    if (totalContratos === 0) return 0
    return Math.round((valor / totalContratos) * 100)
  }

  const comerciaisAgrupados = contratosComStatus.reduce((acc, contrato) => {
    const comercialExistente = acc.find(
      (item) => item.nome === contrato.comercial
    )

    if (comercialExistente) {
      comercialExistente.total += 1
    } else {
      acc.push({
        nome: contrato.comercial,
        total: 1
      })
    }

    return acc
  }, [])

  const comerciaisOrdenados = [...comerciaisAgrupados].sort(
    (a, b) => b.total - a.total
  )

  return (
    <div className="relatorios">
      <div className="titulo-pagina">
        <h1>Relatórios</h1>
        <p>Análises e estatísticas dos contratos</p>
      </div>

      <div className="cards-resumo-relatorios">
        <div className="card-relatorio-topo">
          <div className="card-relatorio-header">
            <h3>Contratos Ativos</h3>
            <span className="icone-card verde">↗</span>
          </div>
          <h2>{totalAtivos}</h2>
          <p>{porcentagem(totalAtivos)}% do total</p>
        </div>

        <div className="card-relatorio-topo">
          <div className="card-relatorio-header">
            <h3>Vencendo em Breve</h3>
            <span className="icone-card amarelo">🗓</span>
          </div>
          <h2>{totalVencendo}</h2>
          <p>{porcentagem(totalVencendo)}% do total</p>
        </div>

        <div className="card-relatorio-topo">
          <div className="card-relatorio-header">
            <h3>Vencidos</h3>
            <span className="icone-card vermelho">📊</span>
          </div>
          <h2>{totalVencidos}</h2>
          <p>{porcentagem(totalVencidos)}% do total</p>
        </div>

        <div className="card-relatorio-topo">
          <div className="card-relatorio-header">
            <h3>Total Geral</h3>
            <span className="icone-card neutro">👥</span>
          </div>
          <h2>{totalContratos}</h2>
          <p>Todos os contratos</p>
        </div>
      </div>

      <div className="blocos-relatorios">
        <div className="bloco-relatorio">
          <h3>Distribuição por Status</h3>

          <div className="linha-status-relatorio">
            <div className="linha-status-topo">
              <div className="status-label">
                <span className="bolinha verde"></span>
                <span>Ativos</span>
              </div>
              <span>
                {totalAtivos} ({porcentagem(totalAtivos)}%)
              </span>
            </div>
            <div className="barra-fundo">
              <div
                className="barra-preenchida verde"
                style={{ width: `${porcentagem(totalAtivos)}%` }}
              ></div>
            </div>
          </div>

          <div className="linha-status-relatorio">
            <div className="linha-status-topo">
              <div className="status-label">
                <span className="bolinha amarelo"></span>
                <span>Vencendo</span>
              </div>
              <span>
                {totalVencendo} ({porcentagem(totalVencendo)}%)
              </span>
            </div>
            <div className="barra-fundo">
              <div
                className="barra-preenchida amarelo"
                style={{ width: `${porcentagem(totalVencendo)}%` }}
              ></div>
            </div>
          </div>

          <div className="linha-status-relatorio">
            <div className="linha-status-topo">
              <div className="status-label">
                <span className="bolinha vermelho"></span>
                <span>Vencidos</span>
              </div>
              <span>
                {totalVencidos} ({porcentagem(totalVencidos)}%)
              </span>
            </div>
            <div className="barra-fundo">
              <div
                className="barra-preenchida vermelho"
                style={{ width: `${porcentagem(totalVencidos)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bloco-relatorio">
          <h3>Contratos por Comercial</h3>

          <div className="lista-comerciais">
            {comerciaisOrdenados.map((comercial) => (
              <div className="linha-comercial-relatorio" key={comercial.nome}>
                <div className="linha-status-topo">
                  <span>{comercial.nome}</span>
                  <span>
                    {comercial.total} ({porcentagem(comercial.total)}%)
                  </span>
                </div>
                <div className="barra-fundo">
                  <div
                    className="barra-preenchida azul"
                    style={{ width: `${porcentagem(comercial.total)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Relatorios