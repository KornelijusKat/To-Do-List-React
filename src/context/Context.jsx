import React, { createContext, useReducer, useContext} from "react";
import reducer from '../reducers/reducer';

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