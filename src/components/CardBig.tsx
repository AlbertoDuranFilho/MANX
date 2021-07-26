import { useContext } from 'react';
import { AnalogContext } from '../contexts/AnalogContext';

import '../styles/cardBig.css';
import { socket } from '../App';

export function CardBig(){
    const {firstAnalog} = useContext(AnalogContext);

    function handleAnalogRead(){
        socket.send("AT+READ=A0");
    }

    return (
        <div className='container-card-big'>
            <h1>
                Nível da água
            </h1>
            <div className=''>
                
            </div>
            <button onClick={handleAnalogRead} className="button-grafic" >Acionar bomba</button>
        </div>
    )
}