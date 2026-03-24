import logo from '../../assets/Logo-Salao.png';
import {Link, withRouter} from 'react-router-dom';


const Sidebar    = () => {
    return (
        <sidebar className='col-2 h-100'>
            <img src={logo}  className='image-fluid px3 py-4'/>
            <ul className='p-0 m-0'>
                <li>
                    <Link to="/" className={location.pathname ==='/' ? 'active' : ''}></Link>
                    <span className="mdi mdi-calendar-check "></span>
                    <text className='ml-2'>Agendamento</text>
                </li>
                <li>
                    <Link to="/clientes" className={location.pathname ==='/clientes' ? 'active' : ''}></Link>
                    <span className="mdi mdi-account-multiple "></span>
                    <text className='ml-2'>Clientes</text>
                </li>
            </ul>
            <h1>Sidebar</h1>
        </sidebar>
    );
};

export default withRouter(Sidebar);