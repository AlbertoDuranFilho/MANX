import { useContext } from 'react';
import { socket } from '../App';
import { DateContext } from '../contexts/DateContext';

import Home from '../assets/home.png';
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

    function handleSetTime(){
        var epoch = (new Date()).getTime() / 1000;
        socket.send('AT+TIME=' + Math.trunc(epoch));

        console.log('AT+TIME=' + Math.trunc(epoch));
    }

    return(
        <div className="container-aside">
            <div className="aside-menu">
                <h1 className='logo'> Manx </h1>
                <ul>
                    <li className=' list active'>
                        <img src={Home} alt='dashboard'/>
                        <p>Dashboard</p>
                    </li>
                </ul>
            </div>

            <div id='DateFormat'>
                <h1 className='date'>{dataAtual.toLocaleDateString('pt-BR')} &nbsp;&nbsp; {dateTimeAll}</h1>
                {/* <h1 className='time'>{dateTimeAll}</h1> */}
                <button className="button-time" onClick={handleSetTime}>Atualizar</button>
            </div>
        </div>
    )
}