import React, { useState,useContext } from 'react'
import { createContext } from 'react'

//created context 
const userContext = createContext()

//user define hook to accecc context values
export const useGlobalContext= () => useContext(userContext);


//created provider and any child that is wrapped around this component will have access to values
function GlobalContext({ children }) {
    const [userName, setUserName] = useState("");
    const [Language,setLanguage] = useState("java");
    return (
        <userContext.Provider value={{ userName, setUserName,Language,setLanguage }}>{children}</userContext.Provider>
    )
}

export default GlobalContext