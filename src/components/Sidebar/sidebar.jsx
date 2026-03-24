import "./sidebar.css"

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">📋</span>
          <h2>Prazo Manager</h2>
        </div>

        <nav className="sidebar-menu">
          <div className="sidebar-option active">
            <span className="sidebar-option-icon">📊</span>
            <p>Painel</p>
          </div>

          <div className="sidebar-option">
            <span className="sidebar-option-icon">📄</span>
            <p>Registros</p>
          </div>

          <div className="sidebar-option">
            <span className="sidebar-option-icon">👥</span>
            <p>Clientes</p>
          </div>

          <div className="sidebar-option">
            <span className="sidebar-option-icon">📈</span>
            <p>Relatórios</p>
          </div>

          <div className="sidebar-option">
            <span className="sidebar-option-icon">⚙️</span>
            <p>Configurações</p>
          </div>
        </nav>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-user-avatar">AD</div>
        <div className="sidebar-user-info">
          <h4>Admin User</h4>
          <p>admin@empresa.com</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar