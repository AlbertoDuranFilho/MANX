import '../styles/table.css'

export function Table (){
    return(
        <div className='conteiner-table'>
            <table className='content-table'>
                <thead>
                    <tr>
                        <th>Ambiente</th>
                        <th>Hora</th>
                        <th>Data</th>
                        <th>Ação</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody id='tbody'>
                </tbody>
            </table>
        </div>
    )
}