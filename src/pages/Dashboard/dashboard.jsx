import PriorityCard from "../../components/PriorityCard/prioritycard"
import SummaryCard from "../../components/SummaryCard/summarycard"
import "./dashboard.css"
import { useState } from "react"

function Dashboard({ contratos }) {
  function verificarStatus(diasVenc) {
    if (diasVenc < 0) {
      return "vencido"
    } else if (diasVenc <= 30) {
      return "vencendo"
    } else {
      return "ativo"
    }
  }

  function calcularDias(dataVenc) {
    const hoje = new Date()
    const vencimento = new Date(dataVenc)

    const diff = vencimento - hoje
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24))

    return dias
  }

  const priorityDataComStatus = contratos.map((item) => {
    const diasVenc = calcularDias(item.dataVenc)
    const status = verificarStatus(diasVenc)

    return {
      ...item,
      diasVenc,
      status
    }
  })

  const priorityDataOrdenado = [...priorityDataComStatus].sort((a, b) => {
    const ordemStatus = {
      vencido: 1,
      vencendo: 2,
      ativo: 3
    }

    const statusA = a.status.toLowerCase()
    const statusB = b.status.toLowerCase()

    if (ordemStatus[statusA] !== ordemStatus[statusB]) {
      return ordemStatus[statusA] - ordemStatus[statusB]
    }

    return a.diasVenc - b.diasVenc
  })

  const [filtro, setFiltro] = useState("todos")

  const priorityDataFiltrado =
    filtro === "todos"
      ? priorityDataOrdenado
      : priorityDataOrdenado.filter((item) => item.status === filtro)

  const totalVencidos = priorityDataComStatus.filter(
    (item) => item.status === "vencido"
  ).length

  const totalVencendo = priorityDataComStatus.filter(
    (item) => item.status === "vencendo"
  ).length

  const totalAtivo = priorityDataComStatus.filter(
    (item) => item.status === "ativo"
  ).length

  const summaryData = [
    {
      title: "Total de Registros",
      value: contratos.length,
      description: "Contratos ativos no sistema"
    },
    {
      title: "Vencendo em Breve",
      value: totalVencendo,
      description: "Nos próximos 30 dias"
    },
    {
      title: "Vencidos",
      value: totalVencidos,
      description: "Requerem atenção imediata"
    },
    {
      title: "Ativos",
      value: totalAtivo,
      description: "Com contratos vigentes"
    }
  ]

  return (
    <>
      <div className="titulo-pagina">
        <h1>Painel de Controle</h1>
        <p>Visão geral dos seus contratos e clientes</p>
      </div>

      <div className="up-cards-dashboard">
        {summaryData.map((card) => (
          <SummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            description={card.description}
          />
        ))}
      </div>

      <div className="filtros-dashboard">
        <button
          className={`filtro-btn ${filtro === "vencido" ? "ativo" : ""}`}
          onClick={() => setFiltro("vencido")}
        >
          Vencidos
        </button>

        <button
          className={`filtro-btn ${filtro === "vencendo" ? "ativo" : ""}`}
          onClick={() => setFiltro("vencendo")}
        >
          Vencendo
        </button>

        <button
          className={`filtro-btn ${filtro === "ativo" ? "ativo" : ""}`}
          onClick={() => setFiltro("ativo")}
        >
          Ativos
        </button>

        <button
          className={`filtro-btn ${filtro === "todos" ? "ativo" : ""}`}
          onClick={() => setFiltro("todos")}
        >
          Todos
        </button>
      </div>

      <div className="priority-cards-dashboard">
        {priorityDataFiltrado.map((card) => (
          <PriorityCard
            key={card.numero}
            numero={card.numero}
            status={card.status}
            nome={card.nome}
            equipamento={card.equipamento}
            dataVenc={card.dataVenc}
            comercial={card.comercial}
            diasVenc={card.diasVenc}
          />
        ))}
      </div>
    </>
  )
}

export default Dashboard