import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import "./sidebar.css"
import icon from "../../assets/calendar.svg"
import dashboard from "../../assets/dashboard.svg"
import clientes from "../../assets/clientes.svg"
import relatorios from "../../assets/relatorio.svg"
import config from "../../assets/config.svg"
import registros from '../../assets/registros.svg'

function Sidebar({ notificacoes = [], marcarLida, marcarTodasLidas }) {
  const [aberto, setAberto] = useState(false)
  const popoverRef = useRef(null)
  const navigate = useNavigate()

  const naoLidas = notificacoes.filter(n => !n.lida)
  const lidas = notificacoes.filter(n => n.lida)

  useEffect(() => {
    function handleClickFora(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setAberto(false)
      }
    }
    document.addEventListener("mousedown", handleClickFora)
    return () => document.removeEventListener("mousedown", handleClickFora)
  }, [])

  function handleClicarNotificacao(n) {
    marcarLida(n.id)
    setAberto(false)
    navigate("/registros", { state: { destacar: n.numeroContrato } })
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">
            <img src={icon} alt="Icon" className="sidebar-icon-img" />
          </span>
          <h2>Prazo Manager</h2>
        </div>

        <nav className="sidebar-menu">
          <NavLink to="/" className="sidebar-option">
            <span className="sidebar-option-icon">
              <img src={dashboard} alt="Dashboard" className="sidebar-icon-img" />
            </span>
            <p>Dashboard</p>
          </NavLink>
          <NavLink to="/registros" className="sidebar-option">
            <span className="sidebar-option-icon">
              <img src={registros} alt="Registros" className="sidebar-icon-img" />
            </span>
            <p>Registros</p>
          </NavLink>
          <NavLink to="/clientes" className="sidebar-option">
            <span className="sidebar-option-icon">
              <img src={clientes} alt="Clientes" className="sidebar-icon-img" />
            </span>
            <p>Clientes</p>
          </NavLink>
          <NavLink to="/relatorios" className="sidebar-option">
            <span className="sidebar-option-icon">
              <img src={relatorios} alt="Relatórios" className="sidebar-icon-img" />
            </span>
            <p>Relatórios</p>
          </NavLink>
          <NavLink to="/configuracoes" className="sidebar-option">
            <span className="sidebar-option-icon">
              <img src={config} alt="Configurações" className="sidebar-icon-img" />
            </span>
            <p>Configurações</p>
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-bottom" ref={popoverRef}>
        <button className="sino-btn" onClick={() => setAberto(prev => !prev)}>
          <span className="sino-icon">🔔</span>
          <span className="sino-label">Notificações</span>
          {naoLidas.length > 0 && (
            <span className="sino-badge">{naoLidas.length}</span>
          )}
        </button>

        {aberto && (
          <div className="notif-popover">
            <div className="notif-popover-header">
              <strong>Notificações</strong>
              {naoLidas.length > 0 && (
                <button className="marcar-todas" onClick={marcarTodasLidas}>
                  Marcar todas como lidas
                </button>
              )}
            </div>

            {naoLidas.length > 0 && (
              <div className="notif-secao">
                <p className="notif-secao-titulo">Não lidas</p>
                {naoLidas.map(n => (
                  <div
                    key={n.id}
                    className={`notif-item notif-${n.tipo} notif-clicavel`}
                    onClick={() => handleClicarNotificacao(n)}
                  >
                    <div className="notif-texto">
                      <strong>{n.titulo}</strong>
                      <p>{n.mensagem}</p>
                    </div>
                    <button
                      className="notif-marcar"
                      onClick={(e) => {
                        e.stopPropagation()
                        marcarLida(n.id)
                      }}
                    >✓</button>
                  </div>
                ))}
              </div>
            )}

            {lidas.length > 0 && (
              <div className="notif-secao">
                <p className="notif-secao-titulo">Lidas</p>
                {lidas.map(n => (
                  <div
                    key={n.id}
                    className="notif-item notif-lida notif-clicavel"
                    onClick={() => handleClicarNotificacao(n)}
                  >
                    <div className="notif-texto">
                      <strong>{n.titulo}</strong>
                      <p>{n.mensagem}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {notificacoes.length === 0 && (
              <p className="notif-vazia">Nenhuma notificação</p>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar