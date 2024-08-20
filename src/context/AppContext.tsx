import React, { createContext, SetStateAction, useState } from "react";
import HistoryType from "../types/HistoryType";
import God from "../svg/God";

export interface AppContextType {
    location: string[],
    setLocation?: React.Dispatch<SetStateAction<string[]>>
    history: HistoryType[],
    setHistory?: React.Dispatch<SetStateAction<HistoryType[]>>
}
export const AppContext = createContext<AppContextType>({
    location: [],
    history: []
})

const AppProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [location, setLocation] = useState<string[]>([])
    const [history, setHistory] = useState<HistoryType[]>([{
        cmd: null,

        loc: null,
        output: <God />
    }, {
        cmd: null,
        loc: null,
        output: "Type 'help' to view a list of available commands"
    }]);

    return <>
        <AppContext.Provider value={{
            location, setLocation,
            history, setHistory
        }}>
            {children}
        </AppContext.Provider>
    </>
}

export default AppProvider;