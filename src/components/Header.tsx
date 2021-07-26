import { useContext } from 'react';

import { socket } from '../App';
import { AnalogContext } from '../contexts/AnalogContext';
import { ToogleContext } from '../contexts/ToogleContext';

import '../styles/header.css'

    var digitalOutput = new Array(8);
    var digitalInput = new Array(8);
    var analog = new Array(4);

    var lastReceived = new Date(); 

export function Header(){
    const {setFirstOutput, setSecondOutput, setThirdOutput} = useContext(ToogleContext);
    const {setFirstAnalog} = useContext(AnalogContext);
    socket.binaryType= 'arraybuffer';

    var typeResponseBytes = -1;    

        //---------------- Função que é acionada quando o Server responde ----------------\\

        socket.addEventListener("message", function(event){
            var connect = document.getElementById('connect')!;

            typeResponseBytes = (event.data instanceof ArrayBuffer) ? 1 : 0;
            connect.style.background = '#04a01e';
            connect.style.border = '1px solid #047717';

            lastReceived = new Date();

            //------------------- Logica de tratar os bytes que chegam e converte-los ------------------\\
            var valueAdressPort = 0;
            if(typeResponseBytes === 1){
                const view = new DataView(event.data);
                for (var i = 0; i < (event.data.byteLength / 4); i++) {
                    var offSet = 4*i;
                    valueAdressPort = ((view.getUint8(offSet+2) & 0x00FF) << 8) | ((view.getUint8(offSet+3) & 0x00FF))

                    if(String.fromCharCode(view.getUint8(offSet)) === 'Q'){
                        digitalOutput[view.getUint8(offSet+1)] = valueAdressPort;
                    }

                    if(String.fromCharCode(view.getUint8(offSet)) === 'I'){
                        digitalInput[view.getUint8(offSet+1)] = valueAdressPort;
                        
                    }

                    if(String.fromCharCode(view.getUint8(offSet)) === 'A'){
                        analog[view.getUint8(offSet+1)] = valueAdressPort;
                        
                    }

                } 
                //------------ Comando de Acionar cada Saída Digital-------------\\
                // Primeira Saída\\
                setFirstOutput(digitalOutput[0]?true : false);
                
                // Segunda Saída\\
                setSecondOutput(digitalOutput[1]?true : false);

                // Terceira Saída\\
                setThirdOutput(digitalOutput[2]?true : false)

                //----------- FIM------------------\\
                
                //------------ Comando de gravar no estado "analog" o valor dos sensores analogicos-------------\\
                // Primeira Saída\\
                if(analog[0] >= 0){
                    setFirstAnalog(Math.trunc((analog[0] * 100) / 1023));
                }
                
                //----------- FIM------------------\\
            } else{
                console.log(event.data)
            }
        }) 

        //---------------- Função que é acionada quando o Websocket é aberto ----------------\\
        
        socket.onopen = () => {
            var connect = document.getElementById('connect')!;

            connect.style.background = '#04a01e';
            connect.style.border = '1px solid #047717';
         
            //---------------------- Função que é acionada a cada 10 segundos ----------------------\\ 
            setInterval(() => {
                var dataAtual = new Date();
                var num = dataAtual.getTime() - lastReceived.getTime();

                if(num > 11000){
                    connect.style.background = 'red';
                    connect.style.border = '1px solid #920303';
                }
                socket.send("AT+READALL?");
                
            },10000)


        };
        
   

    return(
        <div className='container-header'>
            <h1>Bem-vindo</h1>
            <div id='connect'></div>
        </div>
    )
}