import "./formRegistros.css"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

function FormRegistro({ fechar, contratoEditando, config }) {
  const [numero, setNumero] = useState(contratoEditando?.numero || "")
  const [cliente, setCliente] = useState(contratoEditando?.nome || "")
  const [dataAbertura, setDataAbertura] = useState(contratoEditando?.dataAbertura || "")
  const [dataVencimento, setDataVencimento] = useState(contratoEditando?.dataVenc || "")
  const [equipamento, setEquipamento] = useState(contratoEditando?.equipamento || "")
  const [comercial, setComercial] = useState(contratoEditando?.comercial || "")
  const [revalidacao, setRevalidacao] = useState(contratoEditando?.revalidacao || "")

  async function salvarContrato(novoContrato) {
    const { error } = await supabase.from("contratos").insert([
      {
        numero: novoContrato.numero,
        nome: novoContrato.nome,
        equipamento: novoContrato.equipamento,
        data_venc: novoContrato.dataVenc,
        data_abertura: novoContrato.dataAbertura,
        comercial: novoContrato.comercial,
        revalidacao: novoContrato.revalidacao,
      }
    ])

    if (error) {
      console.error("Erro ao editar:", error.message, error.details, error.hint)
      console.log("Contrato enviado para editar:", contrato)
    } else {
      fechar()
      window.location.reload()
    }
  }

  async function editarContratoSupabase(contrato) {
    const { error } = await supabase
      .from("contratos")
      .update({
        nome: contrato.nome,
        equipamento: contrato.equipamento,
        data_venc: contrato.dataVenc || null,
        data_abertura: contrato.dataAbertura || null,
        comercial: contrato.comercial,
        revalidacao: contrato.revalidacao || null,
      })
      .eq("id", contrato.id)

    if (error) {
      console.error("Erro ao editar:", error.message, error.details, error.hint)
      console.log("Contrato enviado para editar:", contrato)
    } else {
      fechar()
      window.location.reload()
    }
  }

  function gerarNumero() {
    const ano = new Date().getFullYear()
    const prefixo = config?.prefixo || `${ano}`
    const sequencial = Date.now().toString().slice(-4)
    return `${prefixo}/${sequencial}`
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const novoContrato = {
      id: contratoEditando?.id,
      numero: numero || gerarNumero(),
      nome: cliente,
      dataAbertura: dataAbertura || null,
      dataVenc: dataVencimento || null,
      equipamento,
      comercial,
      revalidacao: revalidacao || null
    }

    console.log("contratoEditando:", contratoEditando)
    console.log("novoContrato:", novoContrato)

    if (contratoEditando) {
      await editarContratoSupabase(novoContrato)
    } else {
      await salvarContrato(novoContrato)
    }
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