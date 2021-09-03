import { useContext } from 'react';
import Toggle from 'react-toggle';
import { ToogleContext } from '../contexts/ToogleContext';
import { MessageSocketContext } from '../contexts/MessageContext';

import Iluminacao from '../assets/iluminacao.svg';
import ManWalking from '../assets/man-walking.png';

import '../styles/cardSmall.css';

type CardProps = {
    title: string;
    photo: string;
    checked:  boolean;
    saida: string;
    id: string;
};

export function CardSmall(props: CardProps){
    const {firstOutput, setFirstOutput, secondOutput, setSecondOutput, thirdOutput, setThirdOutput} = useContext(ToogleContext);
    const {sendAtCommand} = useContext(MessageSocketContext);

    function handleChange(){
        switch(props.saida){
            case "0":
                if(firstOutput === false){
                    setFirstOutput(true);
                    sendAtCommand("AT+TURNON=Q" + props.saida);
                } else{
                    setFirstOutput(false)
                    sendAtCommand("AT+TURNOFF=Q" + props.saida);
                }
            break;
    
            case "1":
                if(secondOutput === false){
                    setSecondOutput(true);
                    sendAtCommand("AT+TURNON=Q" + props.saida);
                } else{
                    setSecondOutput(false)
                    sendAtCommand("AT+TURNOFF=Q" + props.saida);
                }
            break;
            
            case "2":
                if(thirdOutput === false){
                    setThirdOutput(true);
                    sendAtCommand("AT+TURNON=Q" + props.saida);
                } else{
                    setThirdOutput(false)
                    sendAtCommand("AT+TURNOFF=Q" + props.saida);
                }
            break;
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
            <div className="input">
                <img src={ManWalking} alt="" />
                <h1>Presença</h1>
                <div id={props.id}></div>
            </div>

            <img src={props.photo} alt="Imagem" />
            
        </div>
    )
}