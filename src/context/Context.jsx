import React, { createContext, useReducer, useContext, useEffect} from "react";
import reducer from '../reducers/reducer';
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../services/AuthServices";
import * as projService from "../services/ProjectCRUDservices";
const AppContext = createContext(null);
const initialState = {
    isLogin: true,
    showModal: false, 
    modalId: null,
    projects: []
}
const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const [user, loading] = useAuthState(auth)

    useEffect(() => {
        if (loading) return;
        const fetchData = async () => {
          if (user) {
            try {
                projService.getAllProjects(
                  (projects) => {
                    dispatch({ type: "SET_PROJECTS", payload: projects });
                  },
                  user
                ) 
            }
            catch (error) {
              console.error("Error fetching projects:", error);
            }
          }
        }; 
        fetchData();
    }, [user, loading]);
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