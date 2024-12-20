import { useGlobalContext } from "../../context/Context"
import Login from "../login/Login"
import Register from "../register/Register"


const AuthLayout = () => {
    const {state, dispatch} = useGlobalContext()
    const toggleAuthView = () =>{
        dispatch({type: "TOGGLE_AUTH_VIEW"})
    }
    return(
       <div className="authlayout">
            <div className="img-con">
                
            </div>
            <div className="auth-form-container">
                {state.isLogin ? <Login /> : <Register />}
                <p className="toggle-auth">
                    {state.isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button onClick={toggleAuthView} className="toggle-button">
                        {state.isLogin ? "Register" : "Login"}
                    </button>
                </p>
            </div>
       </div>
    )
}
export default AuthLayout