import {useContext, useEffect, ReactNode, createContext} from 'react'
import {socket} from '../App'

import { ToogleContext } from './ToogleContext';
import { AnalogContext } from './AnalogContext';
import { DateContext } from './DateContext';
import { TableContext } from './TableContext';

var typeResponseBytes = -1;

var digitalOutput = new Array(8);
var digitalInput = new Array(8);
var tempo = [-1,-1,-1,-1,-1];
var tarefa = new Array(20);
var analog = new Array(4);

var taskOutput = new Array<Number>(10); 
var taskDay = new Array(10); 
var taskHours = new Array<Number>(10); 
var taskMinutes = new Array<Number>(10); 
var taskAction = new Array<Number>(10); 

var lastReceived = new Date(); 

var messageProcessed = true;

let commandSchedule: string[] = [];
const limitCmdSchedule = 10;

type MessageSocketContextType = {
    sendAtCommand: (value : string) => void;
}

type MessageSocketProps = {
    children: ReactNode;
}

export const MessageSocketContext = createContext({} as MessageSocketContextType);


export function MessageSocket(props : MessageSocketProps){
    const {setFirstOutput, setSecondOutput, setThirdOutput, loop} = useContext(ToogleContext);
    const {setFirstAnalog} = useContext(AnalogContext);
    const {setDataAtual} = useContext(DateContext);
    const {
        setIsEnvironment, 
        setIsEnvironmentTask1,
        setIsEnvironmentTask2,
        setIsEnvironmentTask3,
        setIsEnvironmentTask4, 
        setIsEnvironmentTask5, 
        setIsEnvironmentTask6, 
        setIsEnvironmentTask7, 
        setIsEnvironmentTask8, 
        setIsEnvironmentTask9, 

        setIsAction, 
        setIsActionTask1,
        setIsActionTask2,
        setIsActionTask3,
        setIsActionTask4,
        setIsActionTask5,
        setIsActionTask6,
        setIsActionTask7,
        setIsActionTask8,
        setIsActionTask9,

        setIsDate, 
        setIsDateTask1,
        setIsDateTask2,
        setIsDateTask3,
        setIsDateTask4,
        setIsDateTask5,
        setIsDateTask6,
        setIsDateTask7,
        setIsDateTask8,
        setIsDateTask9,

        setIsTime, 
        setIsTimeTask1,
        setIsTimeTask2,
        setIsTimeTask3,
        setIsTimeTask4,
        setIsTimeTask5,
        setIsTimeTask6,
        setIsTimeTask7,
        setIsTimeTask8,
        setIsTimeTask9,

        setIsWeekDaysNumber,
        setIsWeekDaysNumber1,
        setIsWeekDaysNumber2,
        setIsWeekDaysNumber3,
        setIsWeekDaysNumber4,
        setIsWeekDaysNumber5,
        setIsWeekDaysNumber6,
        setIsWeekDaysNumber7,
        setIsWeekDaysNumber8,
        setIsWeekDaysNumber9,
    } = useContext(TableContext);
    
    // // ---------------- Função que é acionada quando o Server responde ----------------\\
    socket.onopen = () => {
        var connect = document.getElementById('connect')!;

        connect.style.background = '#04a01e';
        connect.style.border = '1px solid #047717';

        sendAtCommand("AT+READALL?");
        sendAtCommand("AT+TASKS?");

    };

    // //---------------- Função que é acionada quando o Server responde ----------------\\
    function updateScreen(){
        var date = new Date(0);
        var dateFormat = document.getElementById('DateFormat')!;
        if(tempo[0] > -1 && tempo[1] > -1){
            var t = 0;
            var t1 = tempo[0] & 0x0000ffff;
            var t2 = (tempo[1] << 16) & 0xffff0000;
            t = t1 | t2;
            date = new Date(t * 1000);

            dateFormat.style.display = 'flex';
        } 
        setDataAtual(date);

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

        //------------ Comando de gravar no estado "analog" o valor dos sensores analogicos-------------\\
        // Primeira Entrada\\
        if(digitalInput[0] !== undefined){
            var presence1 = document.getElementById('presence0')!;
            if(digitalInput[0] === 1){
                presence1.style.background = '#0093E9';
            } else {
                presence1.style.background = '#D6D6D6';

            }
        }
        if(digitalInput[1] !== undefined){
            var presence2 = document.getElementById('presence1')!;
            if(digitalInput[1] === 1){
                presence2.style.background = '#0093E9';
            } else {
                presence2.style.background = '#D6D6D6';

            }
        }
        
        //----------- FIM------------------\\

        //-------------Tarefa------------------\\

        const diaSemana = ['Dom','Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ]
        for(var i = 0; i < 10; i++){
            var offSet = 2*i;
            taskOutput[i] = (tarefa[offSet] >> 8) & 0x00FF;
            taskAction[i] = (tarefa[offSet]) & 0x0080 ? 1:0;
            taskDay[i] = (tarefa[offSet]) & 0x007F;
            taskHours[i] = (tarefa[offSet + 1] >> 8) & 0x00FF;
            taskMinutes[i] = (tarefa[offSet + 1]) & 0x00FF;

            if(1){ 
                var s = '';
                for(var j = 0; j < 7; j++){
                    var n =  (0x01 << j) & (taskDay[i]);
                    if(n){
                        if(s.length){
                            s += ',';     
                        }
                        s += diaSemana[j];
                                                            
                    }
                }
                

                if(i === 0 ){
                    setIsWeekDaysNumber(taskDay[i]);
                    if(s === "Dom,Seg,Ter,Qua,Qui,Sex,Sab"){
                        setIsDate("Todos os Dias");
                        
                    } else if(s === "Seg,Ter,Qua,Qui,Sex"){
                        setIsDate("De Segunda a Sexta");

                    } else if(s === "Dom,Sab"){
                        setIsDate("Final de semana");
                        
                    } else{
                        setIsDate(s);
                    }

                    if(taskOutput[i] === 0){
                        setIsEnvironment("Luzes da Piscina");
                    } else {
                        setIsEnvironment("Luzes do Campo");
                    } 

                    if(taskAction[i] === 0){
                        setIsAction("Desligar");
                    } else {
                        setIsAction("Ligar");
                    }

                    if(taskHours[i] < 10 && taskMinutes[i] < 10 ){
                        setIsTime(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    }else if(taskHours[i] < 10){
                        setIsTime(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    } else if(taskMinutes[i] < 10){
                        setIsTime(`${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    } else{
                        setIsTime(`${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    }

                }

                if(i === 1 ){
                    setIsWeekDaysNumber1(taskDay[i]);

                    if(s === "Dom,Seg,Ter,Qua,Qui,Sex,Sab"){
                        setIsDateTask1("Todos os Dias");
                        
                    } else if(s === "Seg,Ter,Qua,Qui,Sex"){
                        setIsDateTask1("De Segunda a Sexta");

                    } else if(s === "Dom,Sab"){
                        setIsDateTask1("Final de semana");
                        
                    } else{
                        setIsDateTask1(s);
                    }

                    if(taskOutput[i] === 0){
                        setIsEnvironmentTask1("Luzes da Piscina");
                    } else {
                        setIsEnvironmentTask1("Luzes do Campo");
                    } 

                    if(taskAction[i] === 0){
                        setIsActionTask1("Desligar");
                    } else {
                        setIsActionTask1("Ligar");
                    } 

                    if(taskHours[i] < 10 && taskMinutes[i] < 10 ){
                        setIsTimeTask1(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    }else if(taskHours[i] < 10){
                        setIsTimeTask1(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    } else if(taskMinutes[i] < 10){
                        setIsTimeTask1(`${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    } else{
                        setIsTimeTask1(`${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    }
                }

                if(i === 2 ){
                    setIsWeekDaysNumber2(taskDay[i]);

                    if(s === "Dom,Seg,Ter,Qua,Qui,Sex,Sab"){
                        setIsDateTask2("Todos os Dias");
                        
                    } else if(s === "Seg,Ter,Qua,Qui,Sex"){
                        setIsDateTask2("De Segunda a Sexta");

                    } else if(s === "Dom,Sab"){
                        setIsDateTask2("Final de semana");
                        
                    } else{
                        setIsDateTask2(s);
                    }

                    if(taskOutput[i] === 0){
                        setIsEnvironmentTask2("Luzes da Piscina");
                    } else {
                        setIsEnvironmentTask2("Luzes do Campo");

                    } 

                    if(taskAction[i] === 0){
                        setIsActionTask2("Desligar");
                    } else {
                        setIsActionTask2("Ligar");
                    }

                    if(taskHours[i] < 10 && taskMinutes[i] < 10 ){
                        setIsTimeTask2(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    }else if(taskHours[i] < 10){
                        setIsTimeTask2(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    } else if(taskMinutes[i] < 10){
                        setIsTimeTask2(`${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    } else{
                        setIsTimeTask2(`${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    }
                }

                if(i === 3 ){
                    setIsWeekDaysNumber3(taskDay[i]);
                    if(s === "Dom,Seg,Ter,Qua,Qui,Sex,Sab"){
                        setIsDateTask3("Todos os Dias");
                        
                    } else if(s === "Seg,Ter,Qua,Qui,Sex"){
                        setIsDateTask3("De Segunda a Sexta");

                    } else if(s === "Dom,Sab"){
                        setIsDateTask3("Final de semana");
                        
                    } else{
                        setIsDateTask3(s);
                    }

                    if(taskOutput[i] === 0){
                        setIsEnvironmentTask3("Luzes da Piscina");
                    } else {
                        setIsEnvironmentTask3("Luzes do Campo");
                    } 

                    if(taskAction[i] === 0){
                        setIsActionTask3("Desligar");
                    } else {
                        setIsActionTask3("Ligar");
                    }

                    if(taskHours[i] < 10 && taskMinutes[i] < 10 ){
                        setIsTimeTask3(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    }else if(taskHours[i] < 10){
                        setIsTimeTask3(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    } else if(taskMinutes[i] < 10){
                        setIsTimeTask3(`${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    } else{
                        setIsTimeTask3(`${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    }
                }

                if(i === 4 ){
                    setIsWeekDaysNumber4(taskDay[i]);
                    if(s === "Dom,Seg,Ter,Qua,Qui,Sex,Sab"){
                        setIsDateTask4("Todos os Dias");
                        
                    } else if(s === "Seg,Ter,Qua,Qui,Sex"){
                        setIsDateTask4("De Segunda a Sexta");

                    } else if(s === "Dom,Sab"){
                        setIsDateTask4("Final de semana");
                        
                    } else{
                        setIsDateTask4(s);
                    }

                    if(taskOutput[i] === 0){
                        setIsEnvironmentTask4("Luzes da Piscina");
                    } else {
                        setIsEnvironmentTask4("Luzes do Campo");
                    } 

                    if(taskAction[i] === 0){
                        setIsActionTask4("Desligar");
                    } else {
                        setIsActionTask4("Ligar");
                    }
                    
                    if(taskHours[i] < 10 && taskMinutes[i] < 10 ){
                        setIsTimeTask4(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    }else if(taskHours[i] < 10){
                        setIsTimeTask4(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    } else if(taskMinutes[i] < 10){
                        setIsTimeTask4(`${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    } else{
                        setIsTimeTask4(`${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    }
                }

                if(i === 5){
                    setIsWeekDaysNumber5(taskDay[i]);
                    if(s === "Dom,Seg,Ter,Qua,Qui,Sex,Sab"){
                        setIsDateTask5("Todos os Dias");
                        
                    } else if(s === "Seg,Ter,Qua,Qui,Sex"){
                        setIsDateTask5("De Segunda a Sexta");

                    } else if(s === "Dom,Sab"){
                        setIsDateTask5("Final de semana");
                        
                    } else{
                        setIsDateTask5(s);
                    }

                    if(taskOutput[i] === 0){
                        setIsEnvironmentTask5("Luzes da Piscina");
                    } else {
                        setIsEnvironmentTask5("Luzes do Campo");
                    } 

                    if(taskAction[i] === 0){
                        setIsActionTask5("Desligar");
                    } else {
                        setIsActionTask5("Ligar");
                    }
                    
                    if(taskHours[i] < 10 && taskMinutes[i] < 10 ){
                        setIsTimeTask5(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    }else if(taskHours[i] < 10){
                        setIsTimeTask5(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    } else if(taskMinutes[i] < 10){
                        setIsTimeTask5(`${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    } else{
                        setIsTimeTask5(`${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    }
                }

                if(i === 6 ){
                    setIsWeekDaysNumber6(taskDay[i]);
                    if(s === "Dom,Seg,Ter,Qua,Qui,Sex,Sab"){
                        setIsDateTask6("Todos os Dias");
                        
                    } else if(s === "Seg,Ter,Qua,Qui,Sex"){
                        setIsDateTask6("De Segunda a Sexta");

                    } else if(s === "Dom,Sab"){
                        setIsDateTask6("Final de semana");
                        
                    } else{
                        setIsDateTask6(s);
                    }

                    if(taskOutput[i] === 0){
                        setIsEnvironmentTask6("Luzes da Piscina");
                    } else {
                        setIsEnvironmentTask6("Luzes do Campo");
                    } 

                    if(taskAction[i] === 0){
                        setIsActionTask6("Desligar");
                    } else {
                        setIsActionTask6("Ligar");
                    }

                    if(taskHours[i] < 10 && taskMinutes[i] < 10 ){
                        setIsTimeTask6(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    }else if(taskHours[i] < 10){
                        setIsTimeTask6(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    } else if(taskMinutes[i] < 10){
                        setIsTimeTask6(`${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    } else{
                        setIsTimeTask6(`${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    }
                }

                if(i === 7 ){
                    setIsWeekDaysNumber7(taskDay[i]);
                    if(s === "Dom,Seg,Ter,Qua,Qui,Sex,Sab"){
                        setIsDateTask7("Todos os Dias");
                        
                    } else if(s === "Seg,Ter,Qua,Qui,Sex"){
                        setIsDateTask7("De Segunda a Sexta");

                    } else if(s === "Dom,Sab"){
                        setIsDateTask7("Final de semana");
                        
                    } else{
                        setIsDateTask7(s);
                    }

                    if(taskOutput[i] === 0){
                        setIsEnvironmentTask7("Luzes da Piscina");
                    } else {
                        setIsEnvironmentTask7("Luzes do Campo");
                    } 

                    if(taskAction[i] === 0){
                        setIsActionTask7("Desligar");
                    } else {
                        setIsActionTask7("Ligar");
                    }
                    
                    if(taskHours[i] < 10 && taskMinutes[i] < 10 ){
                        setIsTimeTask7(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    }else if(taskHours[i] < 10){
                        setIsTimeTask7(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    } else if(taskMinutes[i] < 10){
                        setIsTimeTask7(`${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    } else{
                        setIsTimeTask7(`${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    }
                }

                if(i === 8){
                    setIsWeekDaysNumber8(taskDay[i]);
                    if(s === "Dom,Seg,Ter,Qua,Qui,Sex,Sab"){
                        setIsDateTask8("Todos os Dias");
                        
                    } else if(s === "Seg,Ter,Qua,Qui,Sex"){
                        setIsDateTask8("De Segunda a Sexta");

                    } else if(s === "Dom,Sab"){
                        setIsDateTask8("Final de semana");
                        
                    } else{
                        setIsDateTask8(s);
                    }

                    if(taskOutput[i] === 0){
                        setIsEnvironmentTask8("Luzes da Piscina");
                    } else {
                        setIsEnvironmentTask8("Luzes do Campo");
                    } 

                    if(taskAction[i] === 0){
                        setIsActionTask8("Desligar");
                    } else {
                        setIsActionTask8("Ligar");
                    }

                    if(taskHours[i] < 10 && taskMinutes[i] < 10 ){
                        setIsTimeTask8(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    }else if(taskHours[i] < 10){
                        setIsTimeTask8(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    } else if(taskMinutes[i] < 10){
                        setIsTimeTask8(`${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    } else{
                        setIsTimeTask8(`${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    }
                }

                if(i === 9 ){
                    setIsWeekDaysNumber9(taskDay[i]);
                    if(s === "Dom,Seg,Ter,Qua,Qui,Sex,Sab"){
                        setIsDateTask9("Todos os Dias");
                        
                    } else if(s === "Seg,Ter,Qua,Qui,Sex"){
                        setIsDateTask9("De Segunda a Sexta");

                    } else if(s === "Dom,Sab"){
                        setIsDateTask9("Final de semana");
                        
                    } else{
                        setIsDateTask9(s);
                    }

                    if(taskOutput[i] === 0){
                        setIsEnvironmentTask9("Luzes da Piscina");
                    } else {
                        setIsEnvironmentTask9("Luzes do Campo");
                    } 

                    if(taskAction[i] === 0){
                        setIsActionTask9("Desligar");
                    } else {
                        setIsActionTask9("Ligar");
                    }
                    
                    if(taskHours[i] < 10 && taskMinutes[i] < 10 ){
                        setIsTimeTask9(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    }else if(taskHours[i] < 10){
                        setIsTimeTask9(`0${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    } else if(taskMinutes[i] < 10){
                        setIsTimeTask9(`${taskHours[i].toString()}:${taskMinutes[i].toString()}0`)
                    } else{
                        setIsTimeTask9(`${taskHours[i].toString()}:${taskMinutes[i].toString()}`)
                    }
                }
            }
        }
        //------------------ FIM----------------\\
    }

    var intervalMon = window.setInterval(AtCmdMonitor, 10);
    function AtCmdMonitor(){
        if(socket.readyState === 1){
            if(messageProcessed){
                if(commandSchedule.length > 0){
                    let cmd = commandSchedule[0];

                    console.log(cmd);
                    socket.send(cmd);
                    commandSchedule.shift();
                    messageProcessed = false;
                }
            }
        }
    }

    function sendAtCommand(command : string){
        if(commandSchedule.length < limitCmdSchedule){
            commandSchedule.push(command);
        } else{
            console.log(`Mensagem ${command} ignorada: Pilha Cheia`);
        }
    }

    // //---------------- Função que é acionada quando o Server responde ----------------\\
    useEffect(() => {

        var dataAtual = new Date();
        var num = dataAtual.getTime() - lastReceived.getTime();
        var connected = true;
        var connect = document.getElementById('connect')!;
        if(num > 3000){
            connect.style.background = '#F61A15';
            connect.style.border = '1px solid #F61A15';
            connected = false;
        } else{
            connect.style.background = '#04a01e';
            connect.style.border = '1px solid #047717';
            connected = true;
        }

        updateScreen();
        sendAtCommand("AT+READALL?");
        if(socket.readyState === 1){         
            if(!connected){
                console.log('AT');
                socket.send("AT");
            }
        }

    },[loop])

    useEffect(()=>{
    //---------------- Função que é acionada quando o Server responde ----------------\\
        socket.binaryType= 'arraybuffer';
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
                    valueAdressPort = ((view.getUint8(offSet+2) & 0x00FF) << 8) | ((view.getUint8(offSet+3) & 0x00FF));

                    if(String.fromCharCode(view.getUint8(offSet)) === 'Q'){
                        digitalOutput[view.getUint8(offSet+1)] = valueAdressPort;
                        // console.log('Saida');
                    }
                    
                    if(String.fromCharCode(view.getUint8(offSet)) === 'I'){
                        // console.log('Entrada');
                        digitalInput[view.getUint8(offSet+1)] = valueAdressPort;
                    }
                    
                    if(String.fromCharCode(view.getUint8(offSet)) === 'A'){
                        // console.log('Analogico')
                        analog[view.getUint8(offSet+1)] = valueAdressPort;    
                    }
                    
                    if(String.fromCharCode(view.getUint8(offSet)) === 'T'){
                        // console.log('Tempo')
                        tempo[view.getUint8(offSet+1)] = valueAdressPort;  
                    }

                    if(String.fromCharCode(view.getUint8(offSet)) === 'P'){
                        // console.log('Tarefa');
                        tarefa[view.getUint8(offSet+1)] = valueAdressPort; 
                    }   
                }      
        } else{
            console.log(event.data)
        }

        messageProcessed = true;
        updateScreen();
        }); 
    },[])

    return(
        <MessageSocketContext.Provider value={{
            sendAtCommand,
        }}>
            {props.children}
        </MessageSocketContext.Provider>
    )
}

