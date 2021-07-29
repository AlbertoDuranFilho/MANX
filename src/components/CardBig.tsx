import { useState } from 'react';
// import { socket } from '../App';
import Select from 'react-select';
import Modal from 'react-modal';

import '../styles/cardBig.css';

const optionsWeek = [
    { value: 1, label: 'Domingo' },
    { value: 2, label: 'Segunda' },
    { value: 4, label: 'Terça' },
    { value: 8, label: 'Quarta' },
    { value: 16, label: 'Quinta' },
    { value: 32, label: 'Sexta' },
    { value: 64, label: 'Sabado' }
  ]
const optionsTask = [
    { value: '0', label: 'Tarefa 1' },
    { value: '1', label: 'Tarefa 2' },
    { value: '2', label: 'Tarefa 3' },
    { value: '3', label: 'Tarefa 4' },
    { value: '4', label: 'Tarefa 5' },
    { value: '5', label: 'Tarefa 6' },
    { value: '6', label: 'Tarefa 7' },
    { value: '7', label: 'Tarefa 8' },
    { value: '8', label: 'Tarefa 9' },
    { value: '9', label: 'Tarefa 10' },
  ]
const optionsTime = [
    { value: '00,00', label: '00:00' },
    { value: '00,30', label: '00:30' },
    { value: '01,00', label: '01:00' },
    { value: '01,30', label: '01:30' },
    { value: '02,00', label: '02:00' },
    { value: '02,30', label: '02:30' },
    { value: '03,00', label: '03:00' },
    { value: '03,30', label: '03:30' },
    { value: '04,00', label: '04:00' },
    { value: '04,30', label: '04:30' },
    { value: '05,00', label: '05:00' },
    { value: '05,30', label: '05:30' },
    { value: '06,00', label: '06:00' },
    { value: '06,30', label: '06:30' },
    { value: '07,00', label: '07:00' },
    { value: '07,30', label: '07:30' },
    { value: '08,00', label: '08:00' },
    { value: '08,30', label: '08:30' },
    { value: '09,00', label: '09:00' },
    { value: '09,30', label: '09:30' },
    { value: '10,00', label: '10:00' },
    { value: '10,30', label: '10:30' },
    { value: '11,00', label: '11:00' },
    { value: '11,30', label: '11:30' },
    { value: '12,00', label: '12:00' },
    { value: '12,30', label: '12:30' },
    { value: '13,00', label: '13:00' },
    { value: '13,30', label: '13:30' },
    { value: '14,00', label: '14:00' },
    { value: '14,30', label: '14:30' },
    { value: '15,00', label: '15:00' },
    { value: '15,30', label: '15:30' },
    { value: '16,00', label: '16:00' },
    { value: '16,30', label: '16:30' },
    { value: '17,00', label: '17:00' },
    { value: '17,30', label: '17:30' },
    { value: '18,00', label: '18:00' },
    { value: '18,30', label: '18:30' },
    { value: '19,00', label: '19:00' },
    { value: '19,30', label: '19:30' },
    { value: '20,00', label: '20:00' },
    { value: '20,30', label: '20:30' },
    { value: '21,00', label: '21:00' },
    { value: '21,30', label: '21:30' },
    { value: '22,00', label: '22:00' },
    { value: '22,30', label: '22:30' },
    { value: '23,00', label: '23:00' },
    { value: '23,30', label: '23:30' },

  ]
const optionsOutput = [
    { value: '0', label: 'Luzes da Piscina' },
    { value: '1', label: 'Luzes do Campo' },
  ]
const optionsAction = [
    { value: '0', label: 'Desligar' },
    { value: '1', label: 'Ligar' },
  ]
  var week = 0;
  var task = '';
  var time = '';
  var output = '';
  var action = '';
  
  export function CardBig(){
    const [modalTaskIsOpen, setModalTaskIsOpen] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(false);

    function handleOptionsWeek(value : any){

        for(var i = 0; i < 8; i++){
            week = value[i].value
            console.log(week)
        }
        // if(value[0] && value[1]){
        //     week = value[1].value + value[0].value
        // } 
        // console.log(week)
    }

  

    function handleOptionsTask(value : any){
        task = value.value;
        console.log(`Número da Tarefa é: ${task}`)
    }

    function handleOptionsTime(value : any){
        time = value.value
        console.log(`A hora programada é: ${time}`)
         
    }

    function handleOptionsOutput(value : any){
        output = value.value
        console.log(`O valor da saida é: ${output}`)
    }

    function handleOptionsAction(value : any){
        action = value.value
        console.log(`O valor da ação é: ${action}`)
    }

    function handleSetTask(){
        // socket.send(`AT+TASKSET=${task},${output},${time},${action}`)
        console.log(`AT+TASKSET=${task},${output},${time},${action}`)
        setModalTaskIsOpen(false);
        setModalConfirmation(true)
    }


    function openModalTask(){
        setModalTaskIsOpen(true)
    }
    
    function closeModalTask() {
        setModalTaskIsOpen(false);
        setModalConfirmation(true)
    }

    function closeModalConfirmation() {
        setModalConfirmation(false)
    }

    return (
        <div className='container-card-big'>
            <h1> Tarefas </h1>
                <Modal 
                    isOpen={modalTaskIsOpen} 
                    className='modal'
                    overlayClassName="overlay"
                    onRequestClose={handleSetTask}
                    shouldCloseOnOverlayClick={false}
                >
                    <div className='controller' >
                        <h1>Agende uma terefa</h1>
                        <div className='select-days-week'>
                            <p>Dias da Semana</p>
                            <Select 
                                onChange={handleOptionsWeek} 
                                options={optionsWeek} 
                                isMulti  
                                
                            />
                        </div>

                        <div className='select-index-task'>
                            <p>Número da Tarefa</p>
                            <Select onChange={handleOptionsTask} options={optionsTask}  />
                        </div>

                        <div className='select-output'>
                            <p>Ambientes</p> 
                            <Select onChange={handleOptionsOutput} options={optionsOutput} />
                        </div>

                        <div className='select-time'>
                            <p>Hora</p> 
                            <Select onChange={handleOptionsTime} options={optionsTime} />
                        </div>

                        <div className='select-action'>
                            <p>Ação</p> 
                            <Select onChange={handleOptionsAction} options={optionsAction} />
                        </div>

                        <button className='button-confirmation' onClick={handleSetTask} >Confirmar</button>

                    </div>

                </Modal>
                <Modal 
                    isOpen={modalConfirmation} 
                    className='modal-confirmation'
                    overlayClassName="overlay"
                    onRequestClose={closeModalConfirmation}
                    shouldCloseOnOverlayClick={false}
                >
                    <div className='confirmation'>
                        <h1>Tarefa Agendada</h1>
                        <button className='button-ok' onClick={closeModalConfirmation}>OK!</button>
                    </div>
                </Modal>
            <button onClick={openModalTask} className="button-date" >Acionar bomba</button>
        </div>
    )
}