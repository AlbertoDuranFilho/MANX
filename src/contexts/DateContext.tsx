import { useState, createContext, ReactNode } from 'react';

type DateContextType = {
    dataAtual: Date;
    setDataAtual: (value: Date) => void;
}

type DateContextProviderProps = {
    children: ReactNode;
}

export const DateContext = createContext({} as DateContextType)

export function DateProvider(props: DateContextProviderProps){
    const [dataAtual, setDataAtual] = useState( new Date());

    return(
        <DateContext.Provider value={{
            dataAtual,
            setDataAtual,
        }}>
            {props.children}
        </DateContext.Provider>
    )
}