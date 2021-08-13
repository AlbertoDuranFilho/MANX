import { useContext } from 'react';
import { DateContext } from '../contexts/DateContext';

import Home from '../assets/home.png';
import Logo from '../assets/logo.svg';
import '../styles/aside.css'

var dateTimeAll = '';

export function Aside(){
    const {dataAtual} = useContext(DateContext);
    var dateHours = dataAtual.getHours();
    var dateMinutes = dataAtual.getMinutes();

    if(dateHours < 10){
        dateTimeAll = `0${dateHours}:${dateMinutes}`; 
    } else if(dateMinutes < 10){
        dateTimeAll = `${dateHours}:0${dateMinutes}`; 
    } else{
        dateTimeAll = `${dateHours}:${dateMinutes}`; 
        
    }

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
                <h1 className='time'>{dateTimeAll}</h1>
            </div>

        </div>
    )
}