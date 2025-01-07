import React, { createContext, useReducer, useContext, useEffect} from "react";
import reducer from '../reducers/reducer';
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../services/AuthServices";
import * as projService from "../services/ProjectCRUDservices";
const AppContext = createContext(null);
const initialState = {
    isLogin: true,
    projects: []
}
const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const firebaseAuthErrors = {
        // Common errors for both login and registration
        "auth/invalid-email": "Invalid email format.",
        "auth/user-disabled": "This account has been disabled.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/email-already-in-use": "This email is already registered.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/operation-not-allowed": "This operation is not allowed.",
      
        // Registration-specific errors
        "auth/missing-email": "Email is required.",
        "auth/missing-password": "Password is required.",
      
        // Login-specific errors
        "auth/invalid-credential": "Invalid Email or Password.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
        "auth/network-request-failed": "Network error. Check your connection.",
      };
      
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
        <AppContext.Provider value={{state, dispatch, firebaseAuthErrors}}>
            {children}
        </AppContext.Provider>
    )
   
}
export const useGlobalContext = () =>{
    return useContext(AppContext)
}
export {AppContext, AppProvider};