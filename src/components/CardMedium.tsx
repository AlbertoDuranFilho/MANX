import { useContext } from 'react';
import { AnalogContext } from '../contexts/AnalogContext';
import { CircularProgressbar } from 'react-circular-progressbar';

import "react-circular-progressbar/dist/styles.css";
import '../styles/cardMedium.css';
import { socket } from '../App';

export function CardMedium(){
    const {firstAnalog} = useContext(AnalogContext);

    function handleAnalogRead(){
        socket.send("AT+READ=A0");
    }

    return (
        <div className='container-card-medium'>
            <h1>
                Nível da água
            </h1>
            <div className='circular-bar'>
                <CircularProgressbar
                    value={firstAnalog}
                    text={`${firstAnalog}%`}
                />
            </div>
            <button onClick={handleAnalogRead} className='button-bomba'>Acionar bomba</button>
        </div>
    )
}