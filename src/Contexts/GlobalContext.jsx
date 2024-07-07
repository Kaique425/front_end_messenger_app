import React, { useContext, useState, useEffect } from "react"
import { BASE_URL } from "../data/constants"
const GlobalContext = React.createContext()

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}


export const ContextProvider = ({children}) => {
    const [sectors, setSectors] = useState([]) 
    
    const getSectors = async () => {
        const response = await fetch(`${BASE_URL}/sectors/`)
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