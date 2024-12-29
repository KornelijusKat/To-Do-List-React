import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithEmailPassword } from "../../services/AuthServices";

const Login = () => {
  const[errorMessage, setErrorMessage] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const errorText = "Incorrect Email or Password"
  const loginErrMessages =["auth/invalid-email", "auth/invalid-credential"]
  const pwErrMessages = ["auth/missing-password", "auth/invalid-credential"]

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (loading) return;
    // if(user) navigate("/project")
    if (user) console.log("Veikia!");
  }, [loading, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      setErrorMessage("")
      let response = await signInWithEmailPassword(userData.email, userData.password);
      console.log('herlo')
      console.log(response)
      if(response) 
        navigate("/projects")
    }catch(err){
      setErrorMessage(err.code)
      console.log(err.code)
    }
  }

  const handleEmailError = () =>{
     if(loginErrMessages.includes(errorMessage))return "border-danger";
  return ""
  }

  const handlePasswordError = () =>{
    if (pwErrMessages.includes(errorMessage))return "border-danger";
    return ""
  }


  return (
    <div className="container login-container d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h1 className="mb-3">Task Management & To-Do List</h1>
        <form onSubmit={submitHandler} className="form w-100">
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className={`form-control ${handleEmailError()}`}
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className={`form-control ${handlePasswordError()}`}
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          {errorMessage && <p className="text-danger">{errorText}</p>}
          <button type="submit" className="btn btn-primary w-100 mb-1" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
