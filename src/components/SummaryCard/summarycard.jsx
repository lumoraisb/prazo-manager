import "./summarycard.css"

function SummaryCard({ title, value, description, icon }) {
  return (
    <div className="summary-card">
      <div className="summary-card-top">
        <h3>{title}</h3>
        <span className="summary-card-icon">{icon}</span>
      </div>

      <h1 className="summary-card-value">{value}</h1>

      <p className="summary-card-description">{description}</p>
    </div>
  )
}

export default SummaryCard