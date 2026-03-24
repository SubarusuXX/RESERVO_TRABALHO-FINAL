
import {on, Table} from 'rsuite';
const {Column, Cell, HeaderCell, onRowClick} = Table;


const TableComponent = ({data, config, actions, loading, content, onRowClick}) => {
    return(  
        <Table loading={loading} height={400} onRowClick={ onRowClick} > 
        {config.map((c) =>(
        <Column flexGrow={!c.width ? 1 : 0} width={c.width } fixed={c.fixed}>
        <HeaderCell>{c.label}</HeaderCell>
        {!c.content ? (<Cell dataKey={c.key} /> 
        ) : (<Cell>
            {(item) => c.content(item)}</Cell>)}
        </Column>))}
       
        <Column width={150} fixed="right">
        <HeaderCell>Ações</HeaderCell>
        <Cell>{(item) =>actions(item)}</Cell> 
        
        
        
        </Column> 
        </Table>
    );
}; 

export default TableComponent;
