import React, { createContext, useReducer, useContext} from "react";
import reducer from '../reducers/reducer';

const AppContext = createContext(null);
const initialState = {
    isLogin: true,
    projects: []
}
const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
   
}
export const useGlobalContext = () =>{
    return useContext(AppContext)
}
export {AppContext, AppProvider};