//create a context
//provider
//consumer => useContext hook

import { createContext, useReducer } from "react";

const AppContext= createContext();

const initialState={
    isLoading:false,
    isError:false,
    products:[],
}

const AppProvider=({children})=>{
    const[state, dispatch]= useReducer(reducer, initialState)
    return <AppContext.Provider>{children}</AppContext.Provider>
}


export {AppProvider}