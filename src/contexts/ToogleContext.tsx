import { createContext, useState} from 'react';
import { ReactNode } from 'react';
import { socket } from '../App';

type ToogleContextType = {
    firstOutput: boolean;
    setFirstOutput: (value: boolean) => void;
    secondOutput: boolean;
    setSecondOutput: (value: boolean) => void;
    thirdOutput: boolean;
    setThirdOutput: (value: boolean) => void;
    sendAtCommand: (command: string) => void;

    analogRead: number;
    setAnalogRead: (value: number) => void;
}

type ToogleContextProviderProps = {
    children: ReactNode;
}


export const ToogleContext = createContext({} as ToogleContextType);

export function ToogleProvider(props: ToogleContextProviderProps){
    const [firstOutput, setFirstOutput] = useState(false);
    const [secondOutput, setSecondOutput] = useState(false);
    const [thirdOutput, setThirdOutput] = useState(false);
    const [analogRead, setAnalogRead] = useState(0);

    function sendAtCommand(command : string){

        if(socket.readyState === 1){
            socket.send(command);
        }
    }

    return(
        <ToogleContext.Provider value={{
            firstOutput,
            secondOutput,
            thirdOutput,
            setFirstOutput,
            setSecondOutput,
            setThirdOutput,
            sendAtCommand,
            analogRead,
            setAnalogRead
        }}>
            {props.children}
        </ToogleContext.Provider>
    )
}