import '../styles/aside.css'
import Dashboard from '../assets/dashboard.svg';
import Logo from '../assets/logo.svg';

export function Aside(){
    return(
        <div className="container-aside">


            <div className="aside-menu">
                <img className='logo' src={Logo} alt="Logo" />
                <ul>
                    <li>
                        <img src={Dashboard} alt='dashboard'/>
                        <a href="/">Dashboard</a>
                    </li>
                </ul>
            </div>

            <a className='logout' href="/">Logout</a>
        </div>
    )
}