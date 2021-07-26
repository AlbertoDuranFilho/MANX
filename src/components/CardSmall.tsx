import { useContext } from 'react';
import Toggle from 'react-toggle';
import { ToogleContext } from '../contexts/ToogleContext';

import Iluminacao from '../assets/iluminacao.svg';

import '../styles/cardSmall.css';
import { socket } from '../App';

type CardProps = {
    title: string;
    photo: string;
    checked:  boolean;
};

export function CardSmall(props: CardProps){
    const {firstInput, setFirstInput} = useContext(ToogleContext);
    
    function handleChange(){
        if(firstInput === false){
            setFirstInput(true);
            socket.send("AT+TURNON=Q0");
        } else{
            setFirstInput(false)
            socket.send("AT+TURNOFF=Q0");
        }
    }
          
    return(
        <div className='container-card-small'>
            <h1>{props.title}</h1>
            <div className='toogle-light-controller' >
                <img src={Iluminacao} alt="Iluminação" />
                <div className='light'>
                    <h1>Luzes</h1>
                </div>
               <Toggle 
                className='react-toogle'
                onChange={handleChange}
                checked={props.checked}
                
               />
            </div>

            <img src={props.photo} alt="Imagem" />
            
        </div>
    )
}