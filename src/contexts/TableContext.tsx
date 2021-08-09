import { useState, createContext, ReactNode } from 'react';

type TableContextType = {
    isTask: any;
    setIsTask: (value: any) => void;

    isEnvironment: string;
    setIsEnvironment: (value: string) => void;
    isEnvironmentTask1: string;
    setIsEnvironmentTask1: (value : string) => void;
    isEnvironmentTask2: string;
    setIsEnvironmentTask2: (value : string) => void;
    isEnvironmentTask3: string;
    setIsEnvironmentTask3: (value : string) => void;
    isEnvironmentTask4: string;
    setIsEnvironmentTask4: (value : string) => void;
    isEnvironmentTask5: string;
    setIsEnvironmentTask5: (value : string) => void;
    isEnvironmentTask6: string;
    setIsEnvironmentTask6: (value : string) => void;
    isEnvironmentTask7: string;
    setIsEnvironmentTask7: (value : string) => void;
    isEnvironmentTask8: string;
    setIsEnvironmentTask8: (value : string) => void;
    isEnvironmentTask9: string;
    setIsEnvironmentTask9: (value : string) => void;

    isTime: string;
    setIsTime: (value: string) => void;
    isTimeTask1: string;
    setIsTimeTask1: (value: string) => void;
    isTimeTask2: string;
    setIsTimeTask2: (value: string) => void;
    isTimeTask3: string;
    setIsTimeTask3: (value: string) => void;
    isTimeTask4: string;
    setIsTimeTask4: (value: string) => void;
    isTimeTask5: string;
    setIsTimeTask5: (value: string) => void;
    isTimeTask6: string;
    setIsTimeTask6: (value: string) => void;
    isTimeTask7: string;
    setIsTimeTask7: (value: string) => void;
    isTimeTask8: string;
    setIsTimeTask8: (value: string) => void;
    isTimeTask9: string;
    setIsTimeTask9: (value: string) => void;

    isDate: string;
    setIsDate: (value: string) => void;
    isDateTask1: string;
    setIsDateTask1: (value: string) => void;
    isDateTask2: string;
    setIsDateTask2: (value: string) => void;
    isDateTask3: string;
    setIsDateTask3: (value: string) => void;
    isDateTask4: string;
    setIsDateTask4: (value: string) => void;
    isDateTask5: string;
    setIsDateTask5: (value: string) => void;
    isDateTask6: string;
    setIsDateTask6: (value: string) => void;
    isDateTask7: string;
    setIsDateTask7: (value: string) => void;
    isDateTask8: string;
    setIsDateTask8: (value: string) => void;
    isDateTask9: string;
    setIsDateTask9: (value: string) => void;

    isAction: string;
    setIsAction: (value: string) => void;
    isActionTask1: string;
    setIsActionTask1: (value: string) => void;
    isActionTask2: string;
    setIsActionTask2: (value: string) => void;
    isActionTask3: string;
    setIsActionTask3: (value: string) => void;
    isActionTask4: string;
    setIsActionTask4: (value: string) => void;
    isActionTask5: string;
    setIsActionTask5: (value: string) => void;
    isActionTask6: string;
    setIsActionTask6: (value: string) => void;
    isActionTask7: string;
    setIsActionTask7: (value: string) => void;
    isActionTask8: string;
    setIsActionTask8: (value: string) => void;
    isActionTask9: string;
    setIsActionTask9: (value: string) => void;


}

type TableContextProviderProps = {
    children: ReactNode;
}

export const TableContext = createContext({} as TableContextType)

export function TableProvider(props: TableContextProviderProps){
    const [isTask, setIsTask] = useState();

    const [isEnvironment, setIsEnvironment] = useState('');
    const [isEnvironmentTask1, setIsEnvironmentTask1] = useState('');
    const [isEnvironmentTask2, setIsEnvironmentTask2] = useState('');
    const [isEnvironmentTask3, setIsEnvironmentTask3] = useState('');
    const [isEnvironmentTask4, setIsEnvironmentTask4] = useState('');
    const [isEnvironmentTask5, setIsEnvironmentTask5] = useState('');
    const [isEnvironmentTask6, setIsEnvironmentTask6] = useState('');
    const [isEnvironmentTask7, setIsEnvironmentTask7] = useState('');
    const [isEnvironmentTask8, setIsEnvironmentTask8] = useState('');
    const [isEnvironmentTask9, setIsEnvironmentTask9] = useState('');

    const [isTime, setIsTime] = useState('');
    const [isTimeTask1, setIsTimeTask1] = useState('');
    const [isTimeTask2, setIsTimeTask2] = useState('');
    const [isTimeTask3, setIsTimeTask3] = useState('');
    const [isTimeTask4, setIsTimeTask4] = useState('');
    const [isTimeTask5, setIsTimeTask5] = useState('');
    const [isTimeTask6, setIsTimeTask6] = useState('');
    const [isTimeTask7, setIsTimeTask7] = useState('');
    const [isTimeTask8, setIsTimeTask8] = useState('');
    const [isTimeTask9, setIsTimeTask9] = useState('');

    const [isDate, setIsDate] = useState('');
    const [isDateTask1, setIsDateTask1] = useState('');
    const [isDateTask2, setIsDateTask2] = useState('');
    const [isDateTask3, setIsDateTask3] = useState('');
    const [isDateTask4, setIsDateTask4] = useState('');
    const [isDateTask5, setIsDateTask5] = useState('');
    const [isDateTask6, setIsDateTask6] = useState('');
    const [isDateTask7, setIsDateTask7] = useState('');
    const [isDateTask8, setIsDateTask8] = useState('');
    const [isDateTask9, setIsDateTask9] = useState('');

    const [isAction, setIsAction] = useState('');
    const [isActionTask1, setIsActionTask1] = useState('');
    const [isActionTask2, setIsActionTask2] = useState('');
    const [isActionTask3, setIsActionTask3] = useState('');
    const [isActionTask4, setIsActionTask4] = useState('');
    const [isActionTask5, setIsActionTask5] = useState('');
    const [isActionTask6, setIsActionTask6] = useState('');
    const [isActionTask7, setIsActionTask7] = useState('');
    const [isActionTask8, setIsActionTask8] = useState('');
    const [isActionTask9, setIsActionTask9] = useState('');

    return(
        <TableContext.Provider value={{
            isTask,
            setIsTask,

            isEnvironment,
            setIsEnvironment,
            isEnvironmentTask1,
            setIsEnvironmentTask1,
            isEnvironmentTask2,
            setIsEnvironmentTask2,
            isEnvironmentTask3,
            setIsEnvironmentTask3,
            isEnvironmentTask4,
            setIsEnvironmentTask4,
            isEnvironmentTask5,
            setIsEnvironmentTask5,
            isEnvironmentTask6,
            setIsEnvironmentTask6,
            isEnvironmentTask7,
            setIsEnvironmentTask7,
            isEnvironmentTask8,
            setIsEnvironmentTask8,
            isEnvironmentTask9,
            setIsEnvironmentTask9,

            isTime,
            setIsTime,
            isTimeTask1,
            setIsTimeTask1,
            isTimeTask2,
            setIsTimeTask2,
            isTimeTask3,
            setIsTimeTask3,
            isTimeTask4,
            setIsTimeTask4,
            isTimeTask5,
            setIsTimeTask5,
            isTimeTask6,
            setIsTimeTask6,
            isTimeTask7,
            setIsTimeTask7,
            isTimeTask8,
            setIsTimeTask8,
            isTimeTask9,
            setIsTimeTask9,
           

            isDate,
            setIsDate,
            isDateTask1,
            setIsDateTask1,
            isDateTask2,
            setIsDateTask2,
            isDateTask3,
            setIsDateTask3,
            isDateTask4,
            setIsDateTask4,
            isDateTask5,
            setIsDateTask5,
            isDateTask6,
            setIsDateTask6,
            isDateTask7,
            setIsDateTask7,
            isDateTask8,
            setIsDateTask8,
            isDateTask9,
            setIsDateTask9,

            isAction,
            setIsAction,
            isActionTask1,
            setIsActionTask1,
            isActionTask2,
            setIsActionTask2,
            isActionTask3,
            setIsActionTask3,
            isActionTask4,
            setIsActionTask4,
            isActionTask5,
            setIsActionTask5,
            isActionTask6,
            setIsActionTask6,
            isActionTask7,
            setIsActionTask7,
            isActionTask8,
            setIsActionTask8,
            isActionTask9,
            setIsActionTask9,

        }}>
            {props.children}
        </TableContext.Provider>
    )
}