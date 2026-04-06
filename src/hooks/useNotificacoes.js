import { useEffect, useState } from "react"

function calcularDias(dataVenc) {
  const hoje = new Date()
  const vencimento = new Date(dataVenc)
  return Math.ceil((vencimento - hoje) / (1000 * 60 * 60 * 24))
}

function verificarStatus(diasVenc, limite) {
  if (diasVenc < 0) return "vencido"
  if (diasVenc <= limite) return "vencendo"
  return "ativo"
}

export function useNotificacoes(contratos, config) {
  const [toasts, setToasts] = useState([])
  const [notificacoes, setNotificacoes] = useState([])

  function removerToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  function marcarLida(id) {
    setNotificacoes((prev) => {
      const atualizado = prev.map((n) =>
        n.id === id ? { ...n, lida: true } : n
      )
      salvarLidas(atualizado)
      return atualizado
    })
  }

  function marcarTodasLidas() {
    setNotificacoes((prev) => {
      const atualizado = prev.map((n) => ({ ...n, lida: true }))
      salvarLidas(atualizado)
      return atualizado
    })
  }

  function salvarLidas(lista) {
    const lidas = lista.filter((n) => n.lida).map((n) => n.id)
    localStorage.setItem("notificacoes_lidas", JSON.stringify(lidas))
  }

  function getLidas() {
    try {
      return JSON.parse(localStorage.getItem("notificacoes_lidas")) || []
    } catch {
      return []
    }
  }

  function getToastsMostrados() {
    try {
      return JSON.parse(localStorage.getItem("toasts_mostrados")) || []
    } catch {
      return []
    }
  }

  function salvarToastsMostrados(ids) {
    localStorage.setItem("toasts_mostrados", JSON.stringify(ids))
  }

  function gerarLista(lista) {
    const lidas = getLidas()
    const novas = []

    lista.forEach((contrato) => {
      const dias = calcularDias(contrato.dataVenc)
      const status = verificarStatus(dias, config.diasAlerta ?? 30)

      if (status === "vencido" && config.vencidos) {
        const id = `${contrato.numero}-vencido`
        novas.push({
          id,
          tipo: "vencido",
          titulo: "Contrato vencido",
          mensagem: `${contrato.nome} venceu há ${Math.abs(dias)} dias`,
          numeroContrato: contrato.numero,
          lida: lidas.includes(id),
        })
      }

      if (status === "vencendo" && config.vencendo) {
        const id = `${contrato.numero}-vencendo`
        novas.push({
          id,
          tipo: "vencendo",
          titulo: "Contrato vencendo",
          mensagem: `${contrato.nome} vence em ${dias} dias`,
          numeroContrato: contrato.numero,
          lida: lidas.includes(id),
        })
      }
    })

    return novas
  }

  useEffect(() => {
    if (contratos.length === 0) {
      setNotificacoes([])
      setToasts([])
      return
    }

    const geradas = gerarLista(contratos)
    setNotificacoes(geradas)

    const mostrados = getToastsMostrados()

    const novosToasts = geradas.filter(
      (n) => !n.lida && !mostrados.includes(n.id)
    )

    setToasts(novosToasts)

    if (novosToasts.length > 0) {
      salvarToastsMostrados([
        ...new Set([...mostrados, ...novosToasts.map((n) => n.id)]),
      ])
    }
  }, [contratos, config])

  return { toasts, removerToast, notificacoes, marcarLida, marcarTodasLidas }
}