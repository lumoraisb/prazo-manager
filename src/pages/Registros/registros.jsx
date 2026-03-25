import FormRegistro from "../../components/FormRegistros/formRegistros"
import "./registros.css"
import { useState } from "react"

function Registros({ contratos, setContratos }) {

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

    function excluirContrato(numeroContrato) {
        setContratos((listaAtual) => {
             return listaAtual.filter((contrato) => contrato.numero !== numeroContrato)
        })
    }

    const [contratoEditando, setContratoEditando] = useState(null)




    const [mostrarModal, setMostrarModal] = useState(false)

    return (
        <>
            <div className="up-part-registros">
                <div className="titulo-pagina-registros">
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
                    />

                    <select className="select-filtro">
                        <option value="todos">Todos os status</option>
                        <option value="vencido">Vencido</option>
                        <option value="vencendo">Vencendo</option>
                        <option value="ativo">Ativo</option>
                    </select>

                    <select className="select-filtro">
                        <option value="urgente">Vencimento (urgente primeiro)</option>
                        <option value="distante">Vencimento (mais distante)</option>
                    </select>
                </form>
            </div>

            <p className="exibe-quantidade-registros">
                Mostrando {contratosComStatus.length} de {contratosComStatus.length} registros
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
                    {contratosComStatus.map((item) => (
                        <tr key={item.numero}>
                            <td>{item.numero}</td>
                            <td>{item.cliente}</td>
                            <td>23/03/2026</td>
                            <td>{item.dataVenc}</td>
                            <td>{item.diasVenc}</td>
                            <td>{item.equipamento}</td>
                            <td>{item.comercial}</td>
                            <td>
                                <span className={`status-badge ${item.status}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td className="acoes">
                                <button onClick={() => {
                                    setContratoEditando(item)
                                    setMostrarModal(true)
                                }}>✏️</button>
                                <button onClick={() => excluirContrato(item.numero)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >

            {mostrarModal && (
                <FormRegistro
                    fechar={() => {
                        setMostrarModal(false)
                        setContratoEditando(null)
                    }}
                    adicionarContrato={(novoContrato) =>
                        setContratos((listaAtual) => [...listaAtual, novoContrato])
                    }
                    contratoEditando={contratoEditando}
                />
            )
            }
        </>
    )
}

export default Registros