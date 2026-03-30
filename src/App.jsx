import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Sidebar from "./components/Sidebar/sidebar"
import Dashboard from "./pages/Dashboard/dashboard"
import Registros from "./pages/Registros/registros"
import { contratos as contratosIniciais } from "./data/contratos"
import "./App.css"
import Clientes from "./pages/Clientes/clientes"

function App() {

  const [listaContratos, setListaContratos] = useState(contratosIniciais)

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
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
                />
              }
            />
            <Route
              path="/clientes"
              element={
                <Clientes contratos={listaContratos}/>}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App