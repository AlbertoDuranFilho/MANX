import { useState, useContext, useEffect } from 'react';
import { socket } from '../App';
import Select from 'react-select';
import Modal from 'react-modal';

import { Table } from './Table';
import { TableContext } from '../contexts/TableContext';

import Trash from '../assets/trash.svg';
import Edit from '../assets/editar.svg';

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
var time = '';
var output = '';
var action = '';

export function CardBig(){
    const [modalTaskIsOpen, setModalTaskIsOpen] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(false);
    
    const { 
        // isTask,
        isEnvironment,
        isEnvironmentTask1,
        isEnvironmentTask2,
        isEnvironmentTask3,
        isEnvironmentTask4,
        isEnvironmentTask5,
        isEnvironmentTask6,
        isEnvironmentTask7,
        isEnvironmentTask8,
        isEnvironmentTask9,

        
        isTime,
        isTimeTask1,
        isTimeTask2,
        isTimeTask3,
        isTimeTask4,
        isTimeTask5,
        isTimeTask6,
        isTimeTask7,
        isTimeTask8,
        isTimeTask9,
        
        isDate,
        isDateTask1,
        isDateTask2,
        isDateTask3,
        isDateTask4,
        isDateTask5,
        isDateTask6,
        isDateTask7,
        isDateTask8,
        isDateTask9,
        
        isAction,
        isActionTask1,
        isActionTask2,
        isActionTask3,
        isActionTask4,
        isActionTask5,
        isActionTask6,
        isActionTask7,
        isActionTask8,
        isActionTask9
    } = useContext(TableContext);

    var data = [
        {id: 0, environmentTask: isEnvironment, timeTasks: isTime, weekDaysTask: isDate, zactionTask: isAction },
        {id: 1, environmentTask: isEnvironmentTask1, timeTasks: isTimeTask1, weekDaysTask: isDateTask1, zactionTask: isActionTask1 },
        {id: 2, environmentTask: isEnvironmentTask2, timeTasks: isTimeTask2, weekDaysTask: isDateTask2, zactionTask: isActionTask2 },
        {id: 3, environmentTask: isEnvironmentTask3, timeTasks: isTimeTask3, weekDaysTask: isDateTask3, zactionTask: isActionTask3 },
        {id: 4, environmentTask: isEnvironmentTask4, timeTasks: isTimeTask4, weekDaysTask: isDateTask4, zactionTask: isActionTask4 },
        {id: 5, environmentTask: isEnvironmentTask5, timeTasks: isTimeTask5, weekDaysTask: isDateTask5, zactionTask: isActionTask5 },
        {id: 6, environmentTask: isEnvironmentTask6, timeTasks: isTimeTask6, weekDaysTask: isDateTask6, zactionTask: isActionTask6 },
        {id: 7, environmentTask: isEnvironmentTask7, timeTasks: isTimeTask7, weekDaysTask: isDateTask7, zactionTask: isActionTask7 },
        {id: 8, environmentTask: isEnvironmentTask8, timeTasks: isTimeTask8, weekDaysTask: isDateTask8, zactionTask: isActionTask8 },
        {id: 9, environmentTask: isEnvironmentTask9, timeTasks: isTimeTask9, weekDaysTask: isDateTask9, zactionTask: isActionTask9 },
    ];

    useEffect(() => {
        handleListTableDelete();
        console.log(data);

        if(data[0].weekDaysTask !== '' || data[1].weekDaysTask !== '' || data[2].weekDaysTask !== '' || data[3].weekDaysTask !== '' || data[4].weekDaysTask !== '' || data[5].weekDaysTask !== '' || data[6].weekDaysTask !== '' || data[7].weekDaysTask !== '' || data[8].weekDaysTask !== '' || data[9].weekDaysTask !== '' || data[0].timeTasks !== '255'){

            handleListTable();
            
        } else{
            handleListTableDelete();
            console.log("valores vazios");
        }
    
    },[isTime, isTimeTask1, isTimeTask2, isTimeTask3, isTimeTask4, isTimeTask5, isTimeTask6, isTimeTask7, isTimeTask8, isTimeTask9])

    function handleOptionsWeek(value : any){

        for(var i = 0; i < 9; i++){
            if(value[i] !== undefined ){
                // data.weekLabel = value[i].label;
                week = value[i].value;
            }
        }
    }

    function handleOptionsTime(value : any){
        // data.labelTime = value.label;
        time = value.value;
    }

    function handleOptionsOutput(value : any ){
        // data.environmentLabel = value.label
        output = value.value;
    }

    function handleOptionsAction(value : any ){
        action = value.value;
        // data.zactionLabel = value.label;
    }

    function handleSetTask(){
        if(output !== '' && action !== '' && time !== '' && week !== -1 ){
            socket.send(`AT+TASKSET=5,${output},1,${time},${action}`)
            console.log(`5,${output},1,${time},${action}`);
            setModalTaskIsOpen(false);
            setModalConfirmation(true);

        } else {
           alert("Preencha as informações");
        }

    }

    function openModalTask(){
        week = 0;
        time = '';
        output = '';
        action = '';
        setModalTaskIsOpen(true);
    }
    
    function closeModalTask() {
        setModalTaskIsOpen(false);
        setModalConfirmation(false);
    }

    function closeModalConfirmation() {
        setModalConfirmation(false);
    }
    
   

    function handleListTable(){
        var table: HTMLTableElement | any =  document.getElementById("tbody")!;

        for(let i = 0; i < data.length; i++){
            if(data[i].weekDaysTask !== '' ){
                let tr = table.insertRow();

                let td_ambiente = tr.insertCell(); 
                let td_hora = tr.insertCell(); 
                let td_data = tr.insertCell(); 
                let td_acao = tr.insertCell(); 
                let td_opcoes = tr.insertCell(); 

                td_ambiente.innerText = data[i].environmentTask;
                td_hora.innerText = data[i].timeTasks;
                td_data.innerText = data[i].weekDaysTask;
                td_acao.innerText = data[i].zactionTask;
                
                let imgEdit = document.createElement('img')
                imgEdit.src = `${Edit}`;
                
                let imgDelete = document.createElement('img');
                imgDelete.src = `${Trash}`;
                imgDelete.addEventListener('click', function(){handleDeleteRow(data[i].id)}, true);
                
                td_opcoes.appendChild(imgEdit);
                td_opcoes.appendChild(imgDelete);
            }

        }
    }

    function handleDeleteRow(id : any){

        for(let i = 0; i < data.length; i++){
            if(data[i].id === id){
                socket.send(`AT+TASKCLEAR=${id}`);
            }    
            console.log(i);
        }
    }
    
    function handleListTableDelete(){
        let tbody = document.getElementById('tbody')!;

        tbody.innerHTML = '';
    }

    return (
        <div className='container-card-big'>
            <div className='task-header'>
                <h1> Tarefas </h1>
                <button onClick={openModalTask} className="button-date" >Nova Tarefa</button>
            </div>
            <Table />
                <Modal 
                    isOpen={modalTaskIsOpen} 
                    className='modal'
                    overlayClassName="overlay"
                    onRequestClose={handleSetTask}
                    shouldCloseOnOverlayClick={false}
                >
                    <div className='controller' >
                        <div className='title-header'>
                            <h1>Agende uma terefa</h1>
                            <button onClick={closeModalTask} className='fechar'>X</button>
                        </div>
                        <div className='select-days-week'>
                            <p>Dias da Semana</p>
                            <Select 
                                id='daysWeekSelect'
                                onChange={handleOptionsWeek} 
                                options={optionsWeek} 
                                isMulti  
                            />
                        </div>

                        <div className='select-output'>
                            <p>Ambientes</p> 
                            <Select 
                                onChange={handleOptionsOutput} 
                                options={optionsOutput} 
                                id='environmentSelect'
                            />
                        </div>

                        <div className='select-time'>
                            <p>Hora</p> 
                            <Select 
                                onChange={handleOptionsTime} 
                                options={optionsTime} 
                                id='timeSelect'
                            />
                        </div>

                        <div className='select-action'>
                            <p>Ação</p> 
                            <Select 
                                onChange={handleOptionsAction} 
                                options={optionsAction}
                                id='actionSelect' 
                            />
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
        </div>
    )

    
}

