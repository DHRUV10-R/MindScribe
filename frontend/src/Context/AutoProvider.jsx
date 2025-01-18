import React, { Children, createContext } from 'react'
export const AutoContext=createContext()
export const AutoProvider = () => {
    return{
        //<AutoContext.Provider value={{}}>{children}</AutoContext.Provider>
    }
}

function AutoProvider() {
  return (
    <div>AutoProvider</div>
  )
}

export default AutoProvider