import React, { useContext, useState, useEffect } from "react"

const GlobalContext = React.createContext()

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}


export const ContextProvider = ({children}) => {
    const [sectors, setSectors] = useState([]) 
    
    const getSectors = async () => {
        const response = await fetch("http://localhost:8000/sectors/")
        const data = await response.json()
        setSectors(data)
      }


    useEffect( () => {
        getSectors()
    }, [])
    return(
        <GlobalContext.Provider value={sectors}>
            {children}
        </GlobalContext.Provider>
    )

}