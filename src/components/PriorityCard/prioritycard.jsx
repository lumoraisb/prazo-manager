    import "./prioritycard.css"

    function PriorityCard({numero, status, nome, equipamento, dataVenc, comercial, diasVenc}) {
        return (
            <div className="priority-card">
                <div className="priority-left">
                    <div className="priority-top">
                        <h3>{numero}</h3>
                        <span className={`status-badge ${status.toLowerCase()}`}>
                            {status}
                        </span>
                    </div>

                    <p className="priority-nome">{nome}</p>
                    <p className="priority-equipamento">{equipamento}</p>
                </div>

                <div className="priority-right">
                    <p className="priority-dias">faltam: {diasVenc} dias para vencer</p>

                    <div className="priority-info">
                        <p>Vence: {dataVenc}</p>
                        <p>Comercial: {comercial}</p>
                    </div>
                </div>
            </div>
        )
    }

    export default PriorityCard