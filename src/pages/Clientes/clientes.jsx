import ClienteCard from "../../components/ClienteCard/clientecard"
import SummaryCard from "../../components/SummaryCard/summarycard"
import { useState } from "react"
import "./clientes.css"

function Clientes({ contratos }) {

    const [busca, setBusca] = useState("")

    const clientesAgrupados = contratos.reduce((acc, contrato) => {
        const clienteExistente = acc.find((cliente) => cliente.nome === contrato.nome)

        if (clienteExistente) {
            clienteExistente.totalContratos += 1
            clienteExistente.totalRegistros += 1
        } else {
            acc.push({
                nome: contrato.nome,
                totalContratos: 1,
                totalRegistros: 1,
                statusGeral: "Cliente ativo"
            })
        }

        return acc
    }, [])

    const clientesFiltrados = clientesAgrupados.filter((cliente) =>
        cliente.nome.toLowerCase().includes(busca.toLowerCase())
    )


    const totalClientes = clientesAgrupados.length
    const totalContratos = contratos.length
    const mediaPorCliente = totalClientes > 0
        ? (totalContratos / totalClientes).toFixed(1)
        : 0


    return (
        <div className="clientes">
            <div className="titulo-pagina">
                <h1>Clientes</h1>
                <p>Visualize todos os clientes cadastrados</p>
            </div>

            <div className="up-cards-clientes">
                <SummaryCard
                    title="Total de Clientes"
                    value={totalClientes}
                    description="Clientes cadastrados"
                />

                <SummaryCard
                    title="Contratos Ativos"
                    value={totalContratos}
                    description="Total de contratos"
                />

                <SummaryCard
                    title="Média por Cliente"
                    value={mediaPorCliente}
                    description="Contratos por cliente"
                />
            </div>

            <div className="pesquisa-clientes">
                <span>🔍</span>
                <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            <p className="quantidade-clientes">
                Mostrando {clientesFiltrados.length} de {clientesAgrupados.length} clientes
            </p>

            <div className="lista-clientes">
                {clientesFiltrados.map((cliente, index) => (
                    <ClienteCard
                        key={`${cliente.nome || "Sem Nome"}-${index}`}
                        nome={cliente.nome || "Sem Nome"}
                        totalContratos={cliente.totalContratos}
                        totalRegistros={cliente.totalRegistros}
                        statusGeral={cliente.statusGeral}
                    />
                ))}
            </div>
        </div>
    )
}

export default Clientes