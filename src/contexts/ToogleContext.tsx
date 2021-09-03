import { createContext, useState, ReactNode} from 'react';

type ToogleContextType = {
    firstOutput: boolean;
    setFirstOutput: (value: boolean) => void;
    secondOutput: boolean;
    setSecondOutput: (value: boolean) => void;
    thirdOutput: boolean;
    setThirdOutput: (value: boolean) => void;

    analogRead: number;
    setAnalogRead: (value: number) => void;

    loop: number;
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
    const [loop, setLoop] = useState(0);

    setInterval(()=> {
        setLoop(Math.trunc((new Date()).getTime() / 1000) );

    }, 2000)

    return(
        <ToogleContext.Provider value={{
            firstOutput,
            secondOutput,
            thirdOutput,
            setFirstOutput,
            setSecondOutput,
            setThirdOutput,
            analogRead,
            setAnalogRead,
            loop,
        }}>
            {props.children}
        </ToogleContext.Provider>
    )
}