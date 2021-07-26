import { createContext, useState} from 'react';
import { ReactNode } from 'react';
import { socket } from '../App';

type ToogleContextType = {
    firstInput: boolean;
    setFirstInput: (value: boolean) => void;
    secondInput: boolean;
    setSecondInput: (value: boolean) => void;
    thirdInput: boolean;
    setThirdInput: (value: boolean) => void;
    sendAtCommand: (command: string) => void;

    analogRead: number;
    setAnalogRead: (value: number) => void;
}

type ToogleContextProviderProps = {
    children: ReactNode;
}


export const ToogleContext = createContext({} as ToogleContextType);

export function ToogleProvider(props: ToogleContextProviderProps){
    const [firstInput, setFirstInput] = useState(false);
    const [secondInput, setSecondInput] = useState(false);
    const [thirdInput, setThirdInput] = useState(false);
    const [analogRead, setAnalogRead] = useState(0);

    function sendAtCommand(command : string){

        if(socket.readyState === 1){
            socket.send(command);
        }
    }

    return(
        <ToogleContext.Provider value={{
            firstInput,
            secondInput,
            thirdInput,
            setFirstInput,
            setSecondInput,
            setThirdInput,
            sendAtCommand,
            analogRead,
            setAnalogRead
        }}>
            {props.children}
        </ToogleContext.Provider>
    )
}