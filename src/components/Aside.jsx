import { useContext } from 'react';
import { DateContext } from '../contexts/DateContext';

import Dashboard from '../assets/dashboard.svg';
import Home from '../assets/home.png';
import Logo from '../assets/logo.svg';
import '../styles/aside.css'

export function Aside(){
    const {dataAtual} = useContext(DateContext);

    return(
        <div className="container-aside">


            <div className="aside-menu">
                <img className='logo' src={Logo} alt="Logo" />
                <ul>
                    <li className=' list active'>
                        <img src={Home} alt='dashboard'/>
                        <a href="#">Dashboard</a>
                    </li>
                </ul>
            </div>

            <div className='DateFormat'>
                <h1 className='date'>{dataAtual.toLocaleDateString('pt-BR')}</h1>
                <h1 className='time'>{dataAtual.toLocaleTimeString('pt-BR')}</h1>
            </div>

        </div>
    )
}