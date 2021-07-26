import { useContext } from 'react';
import { AnalogContext } from '../contexts/AnalogContext';
import { CircularProgressbar } from 'react-circular-progressbar';

import "react-circular-progressbar/dist/styles.css";
import '../styles/cardMedium.css';

export function CardMedium(){
    const {firstAnalog} = useContext(AnalogContext);

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
            <button className='button-bomba'>Acionar bomba</button>
        </div>
    )
}