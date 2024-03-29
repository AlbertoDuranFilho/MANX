import { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';

import { Table } from './Table';
import { TableContext } from '../contexts/TableContext';
import { MessageSocketContext } from '../contexts/MessageContext';

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

var timeMinutesEdit = "";
var timeHourEdit = "";

var selectWeekEdit = 0;

var idDataEdit = 0;
var timeDataEdit = '';
var weekDaysEdit = 0;
var environmentDataEdit = '';
var actionDataEdit = '';

export function CardBig(){
    const [modalTaskIsOpen, setModalTaskIsOpen] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [value2, setValue2] = useState({});

    const { 
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
        isActionTask9,

        isWeekDaysNumber,
        isWeekDaysNumber1,
        isWeekDaysNumber2,
        isWeekDaysNumber3,
        isWeekDaysNumber4,
        isWeekDaysNumber5,
        isWeekDaysNumber6,
        isWeekDaysNumber7,
        isWeekDaysNumber8,
        isWeekDaysNumber9,

    } = useContext(TableContext);

    const { sendAtCommand } = useContext(MessageSocketContext);

    var data = [
        {id: 0, environmentTask: isEnvironment, timeTasks: isTime, weekDaysTask: isDate, zactionTask: isAction, weekDaysNumber: isWeekDaysNumber },
        {id: 1, environmentTask: isEnvironmentTask1, timeTasks: isTimeTask1, weekDaysTask: isDateTask1, zactionTask: isActionTask1, weekDaysNumber: isWeekDaysNumber1 },
        {id: 2, environmentTask: isEnvironmentTask2, timeTasks: isTimeTask2, weekDaysTask: isDateTask2, zactionTask: isActionTask2, weekDaysNumber: isWeekDaysNumber2 },
        {id: 3, environmentTask: isEnvironmentTask3, timeTasks: isTimeTask3, weekDaysTask: isDateTask3, zactionTask: isActionTask3, weekDaysNumber: isWeekDaysNumber3 },
        {id: 4, environmentTask: isEnvironmentTask4, timeTasks: isTimeTask4, weekDaysTask: isDateTask4, zactionTask: isActionTask4, weekDaysNumber: isWeekDaysNumber4 },
        {id: 5, environmentTask: isEnvironmentTask5, timeTasks: isTimeTask5, weekDaysTask: isDateTask5, zactionTask: isActionTask5, weekDaysNumber: isWeekDaysNumber5 },
        {id: 6, environmentTask: isEnvironmentTask6, timeTasks: isTimeTask6, weekDaysTask: isDateTask6, zactionTask: isActionTask6, weekDaysNumber: isWeekDaysNumber6 },
        {id: 7, environmentTask: isEnvironmentTask7, timeTasks: isTimeTask7, weekDaysTask: isDateTask7, zactionTask: isActionTask7, weekDaysNumber: isWeekDaysNumber7 },
        {id: 8, environmentTask: isEnvironmentTask8, timeTasks: isTimeTask8, weekDaysTask: isDateTask8, zactionTask: isActionTask8, weekDaysNumber: isWeekDaysNumber8 },
        {id: 9, environmentTask: isEnvironmentTask9, timeTasks: isTimeTask9, weekDaysTask: isDateTask9, zactionTask: isActionTask9, weekDaysNumber: isWeekDaysNumber9 },
    ];

    useEffect(() => {
        handleListTableDelete();

        if(data[0].weekDaysTask !== '' || data[1].weekDaysTask !== '' || data[2].weekDaysTask !== '' || data[3].weekDaysTask !== '' || data[4].weekDaysTask !== '' || data[5].weekDaysTask !== '' || data[6].weekDaysTask !== '' || data[7].weekDaysTask !== '' || data[8].weekDaysTask !== '' || data[9].weekDaysTask !== '' || data[0].timeTasks !== '255'){
            handleListTable();
        } else{
            handleListTableDelete();
        }
    
    },[
        isDate, 
        isDateTask1 , 
        isDateTask2, 
        isDateTask3, 
        isDateTask4, 
        isDateTask5, 
        isDateTask6, 
        isDateTask7, 
        isDateTask8, 
        isDateTask9, 
        isTime, 
        isTimeTask1, 
        isTimeTask2, 
        isTimeTask3, 
        isTimeTask4, 
        isTimeTask5, 
        isTimeTask6, 
        isTimeTask7, 
        isTimeTask8, 
        isTimeTask9
    ])

    function handleOptionsWeek(value : any){
        let sum = 0;
        for(var i = 0; i < 9; i++){
            if(value[i] !== undefined ){
                sum += value[i].value; 
            }
        }
        week = sum;
    }

    function handleOptionsTime(value : any){
        time = value.value;
    }

    function handleOptionsOutput(value : any ){
        output = value.value;
    }

    function handleOptionsAction(value : any ){
        action = value.value;
    }

    function handleSetTask(){
        if(output !== '' && action !== '' && time !== '' && week !== 0 ){
            let i = 0
            for(i = 0; i < data.length; i++){
                if(data[i].timeTasks === "255:255" || data[i].weekDaysTask === ""){
                    break;
                }  
            }
            if(i < 10){
                sendAtCommand(`AT+TASKSET=${i},${output},${week},${time},${action}`);
                sendAtCommand('AT+TASKS?');
                setModalTaskIsOpen(false);
                setModalConfirmation(true);
            } else{
                setModalTaskIsOpen(false);
                alert("Lista Cheia, Remova alguma tarefa e tente novamente");
            }
            
        } else {
            alert("Preencha as informações");
            console.log(`AT+TASKSET=,${output},${week},${time},${action}`);
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

    function openModalDelete(id : any){
        setModalDelete(true);

        var buttonDelete = document.getElementById('button-ok')!;
        buttonDelete.addEventListener('click', function(){handleDeleteTask(id);}, true);
        
    }

    function handleDeleteTask(id : any){
        for(let i = 0; i < data.length; i++){
            if(data[i].id === id){
                sendAtCommand(`AT+TASKCLEAR=${id}`);
                sendAtCommand('AT+TASKS?');
                break;
            }    
        }
        setModalDelete(false);

    }

    function closeModelDelete(){
        setModalDelete(false);
    }

    function closeModelEdit(){
        setModalEdit(false);
    }
    function handleWeekSelectEdit(value : any){
        let sum = 0;
        for(var i = 0; i < 9; i++){
            if(value[i] !== undefined ){
                sum += value[i].value; 
            }
        }
        selectWeekEdit = sum; 
     
    }
    
    function handleEdit(dados : any){
        var arrayIndefinido = [];
        idDataEdit = dados.id;
        weekDaysEdit = dados.weekDaysNumber
        timeDataEdit = dados.timeTasks;
        environmentDataEdit = dados.environmentTask;
        actionDataEdit = dados.zactionTask;
        
        for(let i = 0; i < 7; i++){
            if(weekDaysEdit & (1 << i)){
                arrayIndefinido.push(optionsWeek[i]);
            }
        }
        setValue2(arrayIndefinido);
        handleWeekSelectEdit(arrayIndefinido);
        setModalEdit(true);

        let environmentEdit : HTMLSelectElement | any  = document.getElementById('environmentSelectEdit')!;
        let timeEdit : HTMLInputElement | any  = document.getElementById('timeSelectEdit')!;
        let actionEdit : HTMLSelectElement | any  = document.getElementById('actionSelectEdit')!;
        
        // Retorna o valor da Saida (Ambiente) 
        if(environmentDataEdit === "Luzes da Piscina"){
            environmentEdit.selectedIndex = 1;
        } else{
            environmentEdit.selectedIndex = 2;
        }
        // Retorna o valor da Ação 
        if(actionDataEdit === "Desligar"){
            actionEdit.selectedIndex = 1;
        } else{
            actionEdit.selectedIndex = 2;
        }
        
        timeEdit.value = timeDataEdit;

    }
    
    function handleSetTaskEdit(){
        let environmentEdit : HTMLSelectElement | any  = document.getElementById('environmentSelectEdit')!;
        let timeEdit : HTMLInputElement | any  = document.getElementById('timeSelectEdit')!;
        let actionEdit : HTMLSelectElement | any  = document.getElementById('actionSelectEdit')!;

        timeHourEdit = timeEdit.value.substring(0,timeEdit.value.indexOf(":"));
        timeMinutesEdit = timeEdit.value.substring(timeEdit.value.indexOf(":")+1);
        if((selectWeekEdit > 0) && (actionEdit.selectedIndex > -1) && (environmentEdit.selectedIndex > -1) && (timeEdit.value !== '')){
            sendAtCommand(`AT+TASKSET=${idDataEdit},${environmentEdit.value},${selectWeekEdit},${timeHourEdit},${timeMinutesEdit},${actionEdit.value}`);
            sendAtCommand('AT+TASKS?');
            
            setModalEdit(false);
            setModalConfirmation(true);
            
        } else {
            alert("Preencha as informações");
        }
    }

    function handleListTable(){
        var table: HTMLTableElement | any =  document.getElementById("tbody")!;

        for(let i = 0; i < data.length; i++){
            if(data[i].weekDaysTask !== '' && data[i].timeTasks !== "255:255"){
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
                
                let imgEdit = document.createElement('img');
                imgEdit.src = `${Edit}`;
                imgEdit.setAttribute('class', 'img-edit');
                imgEdit.addEventListener('click', function(){handleEdit(data[i])}, true);

                
                let imgDelete = document.createElement('img');
                imgDelete.src = `${Trash}`;
                imgDelete.setAttribute('class', 'img-delete');
                imgDelete.addEventListener('click', function(){openModalDelete(data[i].id);}, true);
                
                td_opcoes.appendChild(imgEdit);
                td_opcoes.appendChild(imgDelete);
            }
        }
    }
    
    function handleListTableDelete(){
        let tbody = document.getElementById('tbody')!;

        tbody.innerHTML = '';
    }

    function handleUpdate(){
        sendAtCommand("AT+TASKS?");
    }

    return (
        <div className='container-card-big'>
            <div className='task-header'>
                <h1> Tarefas </h1>
                <div className='buttons-task'>
                    <button onClick={handleUpdate} className="button-update" >Atualizar</button>
                    <button onClick={openModalTask} className="button-date" >Nova Tarefa</button>
                </div>
            </div>
            <div className="tableBigCard">
                <Table />
            </div>
                <Modal 
                    isOpen={modalTaskIsOpen} 
                    className='modal'
                    overlayClassName="overlay"
                    onRequestClose={handleSetTask}
                    shouldCloseOnOverlayClick={false}
                    ariaHideApp={false}

                >
                    <div className='controller' >
                        <div className='title-header'>
                            <h1>Agende uma tarefa</h1>
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
                                id='environmentSelect'
                                onChange={handleOptionsOutput} 
                                options={optionsOutput}
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
                    isOpen={modalEdit} 
                    className='modal'
                    overlayClassName="overlay"
                    onRequestClose={handleSetTaskEdit}
                    shouldCloseOnOverlayClick={false}
                    ariaHideApp={false}

                >
                    <div className='controller' >
                        <div className='title-header'>
                            <h1>Edite sua tarefa</h1>
                            <button onClick={closeModelEdit} className='fechar'>X</button>
                        </div>
                        <div className='select-days-week'>
                            <p>Dias da Semana</p>
                            <Select 
                                id='daysWeekSelectEdit'
                                onChange={handleWeekSelectEdit} 
                                options={optionsWeek} 
                                isMulti
                                defaultValue={value2}
                            />
                               
                        </div>

                        <div className='select-output'>
                            <p>Ambientes</p> 
                            <div className="select">
                                <select  id='environmentSelectEdit'>
                                    <option value=""></option>
                                    <option className='option' value="0">Luzes da Piscina</option>
                                    <option className='option' value="1">Luzes do Campo</option>
                                </select>
                            </div>
                        </div>

                        <div className='select-time'>
                            <p>Hora</p> 
                            <input type="time" id='timeSelectEdit'/>
                        </div>

                        <div className='select-action'>
                            <p>Ação</p> 
                            <div className="select">
                                <select  id='actionSelectEdit'>
                                    <option value=""></option>
                                    <option value="0">Desligar</option>
                                    <option value="1">Ligar</option>
                                </select>
                            </div>
                        </div>

                        <button className='button-confirmation' onClick={handleSetTaskEdit} >Confirmar</button>

                    </div>

                </Modal>
                <Modal 
                    isOpen={modalConfirmation} 
                    className='modal-confirmation'
                    overlayClassName="overlay"
                    onRequestClose={closeModalConfirmation}
                    shouldCloseOnOverlayClick={false}
                    ariaHideApp={false}
                >
                    <div className='confirmation'>
                        <h1>Sucesso</h1>
                        <p>😄</p>
                        <button className='button-confirmation' onClick={closeModalConfirmation}>OK!</button>
                    </div>
                </Modal>
                <Modal 
                    isOpen={modalDelete} 
                    className='modal-delete'
                    overlayClassName="overlay"
                    onRequestClose={closeModelDelete}
                    shouldCloseOnOverlayClick={false}
                    ariaHideApp={false}

                >
                    <div className='confirmation'>
                        <h1>Tarefa Excluida</h1>
                        <p>🤔</p>
                        <div className="buttonDelete">
                            <button className='button-cancel' onClick={closeModelDelete}>Cancelar</button>
                            <button id='button-ok' onClick={handleDeleteTask}>Excluir</button>
                        </div>
                    </div>
                </Modal>
        </div>
    )  
}

