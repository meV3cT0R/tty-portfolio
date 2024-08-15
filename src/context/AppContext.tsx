import React, { createContext, SetStateAction, useState } from "react";

export const AppContext = createContext<{
    location: string[],
    setLocation?: React.Dispatch<SetStateAction<string[]>> 
}>({
    location : [],
})

const AppProvider : React.FC<{children?: React.ReactNode}> = ({children})=> {
    const [location,setLocation] = useState<string[]>([])
    return <>
        <AppContext.Provider value={{
            location,setLocation
        }}>
            {children}
        </AppContext.Provider>
    </>
}

export default AppProvider;