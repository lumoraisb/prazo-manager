import FormRegistro from "../../components/FormRegistros/formRegistros"
import "./registros.css"
import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { supabase } from "../../lib/supabase"

function Registros({ contratos, setContratos, config }) {
  const [contratoEditando, setContratoEditando] = useState(null)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [ordenacao, setOrdenacao] = useState("urgente")
  const [destacado, setDestacado] = useState(null)

  const location = useLocation()
  const linhaRef = useRef(null)

  useEffect(() => {
    if (location.state?.destacar) {
      setDestacado(location.state.destacar)
      setTimeout(() => setDestacado(null), 3000)
    }
  }, [location.state])

  useEffect(() => {
    if (destacado && linhaRef.current) {
      linhaRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [destacado])

  function calcularDias(dataVenc) {
    const hoje = new Date()
    const vencimento = new Date(dataVenc)
    const diff = vencimento - hoje
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  function verificarStatus(diasVenc) {
    if (diasVenc < 0) return "vencido"
    if (diasVenc <= (config?.diasAlerta ?? 30)) return "vencendo"
    return "ativo"
  }

  async function excluirContrato(id) {
  const { error } = await supabase
    .from("contratos")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Erro ao deletar:", error)
  } else {
    window.location.reload()
  }
}

  const contratosComStatus = contratos.map((item) => {
    const diasVenc = calcularDias(item.dataVenc)
    const status = verificarStatus(diasVenc)
    return { ...item, diasVenc, status }
  })

  const contratosFiltrados = contratosComStatus
    .filter((item) => {
      const termo = busca.toLowerCase()
      return (
        item.numero.toLowerCase().includes(termo) ||
        item.nome.toLowerCase().includes(termo) ||
        item.equipamento.toLowerCase().includes(termo) ||
        item.comercial.toLowerCase().includes(termo)
      )
    })
    .filter((item) => {
      if (filtroStatus === "todos") return true
      return item.status === filtroStatus
    })
    .sort((a, b) => {
      if (ordenacao === "urgente") return a.diasVenc - b.diasVenc
      return b.diasVenc - a.diasVenc
    })

  return (
    <>
      <div className="up-part-registros">
        <div className="titulo-pagina">
          <h1>Registros</h1>
          <p>Gerencie todos os contratos e equipamentos</p>
        </div>
        <div className="up-part-button">
          <button onClick={() => setMostrarModal(true)}>
            <span>+</span>
            <p>Novo Contrato</p>
          </button>
        </div>
      </div>

      <div className="form-filter-registros">
        <form>
          <input
            type="text"
            placeholder="Buscar por número, cliente..."
            className="input-busca"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <select className="select-filtro" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
            <option value="todos">Todos os status</option>
            <option value="vencido">Vencido</option>
            <option value="vencendo">Vencendo</option>
            <option value="ativo">Ativo</option>
          </select>
          <select className="select-filtro" value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
            <option value="urgente">Vencimento (urgente primeiro)</option>
            <option value="distante">Vencimento (mais distante)</option>
          </select>
        </form>
      </div>

      <p className="exibe-quantidade-registros">
        Mostrando {contratosFiltrados.length} de {contratosComStatus.length} registros
      </p>

      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Cliente</th>
            <th>Data Abertura</th>
            <th>Data Vencimento</th>
            <th>Dias p/ Vencer</th>
            <th>Equipamento</th>
            <th>Comercial</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contratosFiltrados.map((item) => (
            <tr
              key={item.numero}
              ref={item.numero === destacado ? linhaRef : null}
              className={item.numero === destacado ? "linha-destacada" : ""}
            >
              <td>{item.numero}</td>
              <td>{item.nome}</td>
              <td>{item.dataAbertura || "—"}</td>
              <td>{item.dataVenc}</td>
              <td>{item.diasVenc}</td>
              <td>{item.equipamento}</td>
              <td>{item.comercial}</td>
              <td>
                <span className={`status-badge ${item.status}`}>{item.status}</span>
              </td>
              <td className="acoes">
                <button onClick={() => { setContratoEditando(item); setMostrarModal(true) }}>✏️</button>
                <button onClick={() => excluirContrato(item.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarModal && (
        <FormRegistro
          fechar={() => { setMostrarModal(false); setContratoEditando(null) }}
          adicionarContrato={(novoContrato) => setContratos(listaAtual => [...listaAtual, novoContrato])}
          editarContrato={(contratoAtualizado) =>
            setContratos(listaAtual =>
              listaAtual.map(contrato =>
                contrato.numero === contratoAtualizado.numero ? contratoAtualizado : contrato
              )
            )
          }
          contratoEditando={contratoEditando}
          config={config}
        />
      )}
    </>
  )
}

export default Registros