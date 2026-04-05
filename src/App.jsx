import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Sidebar from "./components/Sidebar/sidebar"
import Dashboard from "./pages/Dashboard/dashboard"
import Registros from "./pages/Registros/registros"
import { contratos as contratosIniciais } from "./data/contratos"
import "./App.css"
import Clientes from "./pages/Clientes/clientes"
import Relatorios from "./pages/Relatorio/relatorios"
import Configuracoes from "./pages/Configuracoes/config"
import { useNotificacoes } from "./hooks/useNotificacoes"
import ToastContainer from "./components/ToastContainer/toastContainer"

function App() {
  const [listaContratos, setListaContratos] = useState(contratosIniciais)

  const [configNotificacoes, setConfigNotificacoes] = useState({
    vencendo: true,
    vencidos: true,
    email: false,
    diasAlerta: 30,
    prefixo: "",
  })

  const { toasts, removerToast, notificacoes, marcarLida, marcarTodasLidas } =
    useNotificacoes(listaContratos, configNotificacoes)

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
            <Route path="/" element={<Dashboard contratos={listaContratos} />} />
            <Route path="/registros" element={<Registros contratos={listaContratos} setContratos={setListaContratos} config={configNotificacoes} />} />
            <Route path="/clientes" element={<Clientes contratos={listaContratos} />} />
            <Route path="/relatorios" element={<Relatorios contratos={listaContratos} />} />
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