import { useEffect } from "react"
import "./toastcontainer.css"

function Toast({ toast, onRemover }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemover(toast.id), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`toast toast-${toast.tipo}`}>
      <div className="toast-left">
        <span className="toast-icon">
          {toast.tipo === "vencido" ? "🔴" : "🟡"}
        </span>
      </div>
      <div className="toast-body">
        <strong>{toast.titulo}</strong>
        <p>{toast.mensagem}</p>
      </div>
      <button className="toast-fechar" onClick={() => onRemover(toast.id)}>✕</button>
    </div>
  )
}

function ToastContainer({ toasts, onRemover }) {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemover={onRemover} />
      ))}
    </div>
  )
}

export default ToastContainer