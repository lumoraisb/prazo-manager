import { BrowserRouter, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar/sidebar"
import Dashboard from "./pages/Dashboard/dashboard"
import Registros from "./pages/Registros/registros"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/registros" element={<Registros />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App