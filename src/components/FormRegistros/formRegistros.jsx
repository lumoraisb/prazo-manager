import "./formRegistros.css"
import { useState } from "react"

function FormRegistro({ fechar, adicionarContrato, editarContrato, contratoEditando }) {
  const [numero, setNumero] = useState(contratoEditando?.numero || "")
  const [cliente, setCliente] = useState(contratoEditando?.nome || "")
  const [dataAbertura, setDataAbertura] = useState(contratoEditando?.dataAbertura || "")
  const [dataVencimento, setDataVencimento] = useState(contratoEditando?.dataVenc || "")
  const [equipamento, setEquipamento] = useState(contratoEditando?.equipamento || "")
  const [comercial, setComercial] = useState(contratoEditando?.comercial || "")
  const [revalidacao, setRevalidacao] = useState(contratoEditando?.revalidacao || "")

  function gerarNumero() {
    return `CTR-${Date.now()}`
  }

  function handleSubmit(e) {
    e.preventDefault()

    const novoContrato = {
      numero: numero || gerarNumero(),
      nome: cliente,
      dataAbertura,
      dataVenc: dataVencimento,
      equipamento,
      comercial,
      revalidacao
    }

    if (contratoEditando) {
      editarContrato(novoContrato)
    } else {
      adicionarContrato(novoContrato)
    }

    fechar()
  }

  return (
    <div className="novo-contrato-overlay">
      <div className="novo-contrato-modal">
        <div className="header-novo-contrato">
          <h1>{contratoEditando ? "Editar Contrato" : "Novo Contrato"}</h1>
          <button type="button" className="fechar-modal" onClick={fechar}>
            ✕
          </button>
        </div>

        <form className="form-novo-contrato" onSubmit={handleSubmit}>
          <div className="linha-form">
            <div className="campo-form">
              <label>Número</label>
              <input
                type="text"
                placeholder="Auto-gerado se deixado em branco"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                disabled={!!contratoEditando}
              />
              <p className="descricao-campo">
                Deixe em branco para gerar automaticamente
              </p>
            </div>

            <div className="campo-form">
              <label>Cliente <span>*</span></label>
              <input
                type="text"
                placeholder="Nome do cliente"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              />
            </div>
          </div>

          <div className="linha-form">
            <div className="campo-form">
              <label>Data de Abertura</label>
              <input
                type="date"
                value={dataAbertura}
                onChange={(e) => setDataAbertura(e.target.value)}
              />
            </div>

            <div className="campo-form">
              <label>Data de Vencimento <span>*</span></label>
              <input
                type="date"
                value={dataVencimento}
                onChange={(e) => setDataVencimento(e.target.value)}
              />
            </div>
          </div>

          <div className="campo-form">
            <label>Equipamento <span>*</span></label>
            <input
              type="text"
              placeholder="Descrição do equipamento"
              value={equipamento}
              onChange={(e) => setEquipamento(e.target.value)}
            />
          </div>

          <div className="linha-form">
            <div className="campo-form">
              <label>Comercial <span>*</span></label>
              <input
                type="text"
                placeholder="Nome do comercial"
                value={comercial}
                onChange={(e) => setComercial(e.target.value)}
              />
            </div>

            <div className="campo-form">
              <label>Revalidação</label>
              <input
                type="date"
                value={revalidacao}
                onChange={(e) => setRevalidacao(e.target.value)}
              />
            </div>
          </div>

          <div className="campo-form">
            <label>Vencimento Geral</label>
            <input type="date" />
          </div>

          <div className="acoes-form">
            <button type="button" className="btn-cancelar" onClick={fechar}>
              Cancelar
            </button>

            <button type="submit" className="btn-criar">
              {contratoEditando ? "Salvar Alterações" : "Criar Contrato"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormRegistro