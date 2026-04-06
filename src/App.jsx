import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar/sidebar"
import Dashboard from "./pages/Dashboard/dashboard"
import Registros from "./pages/Registros/registros"
import "./App.css"
import Clientes from "./pages/Clientes/clientes"
import Relatorios from "./pages/Relatorio/relatorios"
import Configuracoes from "./pages/Configuracoes/config"
import ToastContainer from "./components/ToastContainer/toastContainer"
import { useNotificacoes } from "./hooks/useNotificacoes"
import { supabase } from "./lib/supabase"

function App() {
  const [listaContratos, setListaContratos] = useState([])
  const [carregando, setCarregando] = useState(true)

  const [configNotificacoes, setConfigNotificacoes] = useState(() => {
    try {
      const salva = localStorage.getItem("config_notificacoes")
      return salva
        ? JSON.parse(salva)
        : {
            vencendo: true,
            vencidos: true,
            email: false,
            diasAlerta: 30,
            prefixo: "",
          }
    } catch {
      return {
        vencendo: true,
        vencidos: true,
        email: false,
        diasAlerta: 30,
        prefixo: "",
      }
    }
  })

  const { toasts, removerToast, notificacoes, marcarLida, marcarTodasLidas } =
    useNotificacoes(listaContratos, configNotificacoes)

  useEffect(() => {
    localStorage.setItem(
      "config_notificacoes",
      JSON.stringify(configNotificacoes)
    )
  }, [configNotificacoes])

  useEffect(() => {
    buscarContratos()
  }, [])

  async function buscarContratos() {
    setCarregando(true)

    const { data, error } = await supabase
      .from("contratos")
      .select("*")
      .order("data_venc", { ascending: true })

    if (error) {
      console.error("Erro ao buscar contratos:", error)
    } else {
      const formatados = data.map((c) => ({
        id: c.id,
        numero: c.numero,
        nome: c.nome,
        equipamento: c.equipamento,
        dataVenc: c.data_venc,
        dataAbertura: c.data_abertura,
        comercial: c.comercial,
        revalidacao: c.revalidacao,
      }))

      setListaContratos(formatados)
    }

    setCarregando(false)
  }

  if (carregando) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontSize: "1rem",
          color: "#6b7280",
        }}
      >
        Carregando...
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar
          notificacoes={notificacoes}
          marcarLida={marcarLida}
          marcarTodasLidas={marcarTodasLidas}
        />

        <main className="app-content">
          <Routes>
            <Route
              path="/"
              element={<Dashboard contratos={listaContratos} />}
            />

            <Route
              path="/registros"
              element={
                <Registros
                  contratos={listaContratos}
                  setContratos={setListaContratos}
                  config={configNotificacoes}
                />
              }
            />

            <Route
              path="/clientes"
              element={<Clientes contratos={listaContratos} />}
            />

            <Route
              path="/relatorios"
              element={<Relatorios contratos={listaContratos} />}
            />

            <Route
              path="/configuracoes"
              element={
                <Configuracoes
                  config={configNotificacoes}
                  setConfig={setConfigNotificacoes}
                  contratos={listaContratos}
                />
              }
            />
          </Routes>
        </main>

        <ToastContainer toasts={toasts} onRemover={removerToast} />
      </div>
    </BrowserRouter>
  )
}

export default App