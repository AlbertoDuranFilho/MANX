import { useState, createContext, ReactNode } from 'react';

type AnalogContextType = {
    firstAnalog: number;
    setFirstAnalog: (valor: number) => void;
}

type AnalogContextProviderProps = {
    children: ReactNode;
}

export const AnalogContext = createContext({} as AnalogContextType)

export function AnalogProvider(props: AnalogContextProviderProps){
    const [firstAnalog, setFirstAnalog] = useState(0);

    return(
        <AnalogContext.Provider value={{
            firstAnalog,
            setFirstAnalog,
        }}>
            {props.children}
        </AnalogContext.Provider>
    )
}