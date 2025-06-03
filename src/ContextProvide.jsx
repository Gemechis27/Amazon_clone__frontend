import React,{useState,createContext, useContext} from "react"

const colorContext= createContext()

export const useColor=()=>{
    return useContext(colorContext)
}
export const ThemeProvider=(children)=>{
    const [color, setColor] = useState('light')

    const colorToggle=()=>{
        setColor((pre)=>pree==='light'? 'dark':'light')
        
    }
    return(
        <colorContext.Provider value={{color,colorToggle}}>
            {children}
        </colorContext.Provider>
    )
}