import { useState } from "react"
import PriorityCard from "../../components/PriorityCard/prioritycard"
import SummaryCard from "../../components/SummaryCard/summarycard"
import "./dashboard.css"

function Dashboard() {
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

  const priorityData = [
    {
      numero: "2026/1",
      nome: "Huawei",
      equipamento: "Switch",
      dataVenc: "2026-03-20",
      comercial: "Angelo",
    },
    {
      numero: "2026/2",
      nome: "Google",
      equipamento: "Servidor",
      dataVenc: "2026-03-28",
      comercial: "Maria",
    },
    {
      numero: "2026/3",
      nome: "Amazon",
      equipamento: "Roteador",
      dataVenc: "2026-04-10",
      comercial: "João",
    },
    {
      numero: "2026/4",
      nome: "Netflix",
      equipamento: "Firewall",
      dataVenc: "2026-04-25",
      comercial: "Ana",
    },
    {
      numero: "2026/5",
      nome: "Microsoft",
      equipamento: "Switch",
      dataVenc: "2026-05-20",
      comercial: "Carlos",
    },
    {
      numero: "2026/6",
      nome: "Meta",
      equipamento: "Servidor",
      dataVenc: "2026-06-10",
      comercial: "Beatriz",
    },
    {
      numero: "2026/7",
      nome: "Meta",
      equipamento: "Teste",
      dataVenc: "2026-03-24",
      comercial: "Beatriz",
    }
  ]

  const priorityDataComStatus = priorityData.map((item) => {
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
    (item) => item.status.toLowerCase() === "vencido"
  ).length

  const totalVencendo = priorityDataComStatus.filter(
    (item) => item.status.toLowerCase() === "vencendo"
  ).length

  const totalAtivo = priorityDataComStatus.filter(
    (item) => item.status.toLowerCase() === "ativo"
  ).length

  const summaryData = [
    {
      title: "Total de Registros",
      value: priorityData.length,
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
        {summaryData.map((card) => {
          return (
            <SummaryCard
              key={card.title}
              title={card.title}
              value={card.value}
              description={card.description}
            />
          )
        })}
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
        {priorityDataFiltrado.map((card) => {
          return (
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
          )
        })}
      </div>
    </>
  )
}

export default Dashboard