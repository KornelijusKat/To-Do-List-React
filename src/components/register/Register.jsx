import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
} from "../../services/AuthServices";
import "./_register.scss";


const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState(""); // Separate confirmPassword state
  const [errorText, setErrorText] = useState("")
  const [errorMessage, setErrorMessage] = useState(""); // Error handling
  const [user, loading] = useAuthState(auth); // Firebase auth
  const navigate = useNavigate();
  const emailErrMessages = ["auth/email-already-in-use", "auth/invalid-email"]
  const pwErrMessages = ["auth/weak-password", "auth/no-match-password"]

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (userData.password !== confirmPassword) {
      setErrorText("Passwords do not match!");
      setErrorMessage("true")
      console.log(setErrorText)
      return;
    }
    try{
      setErrorMessage("");
      setErrorText("")
      let result = await registerWithEmailAndPassword(
        userData.name,
        userData.email,
        userData.password
      );
      console.log(result)
      if(user) 
        console.log('works')
        navigate("/projects")
    }catch(err){
      if(emailErrMessages.includes(err.code)) setErrorText("Email in use!");
      if(pwErrMessages.includes(err.code)) setErrorText("Weak password!");
      setErrorMessage(err.code)
      console.log(err.code)
      console.log(err)
    }
  };


  const handleEmailError = () =>{
    if(emailErrMessages.includes(errorMessage) || errorMessage == "true")return "border-danger";
  return ""
  }
  const handlePasswordError = () =>{
    if(pwErrMessages.includes(errorMessage) || errorMessage == "true")return "border-danger";
  return ""
  }

  // useEffect(() => {
  //   if (loading) return;
  //   if (user) navigate("/works");
  // }, [loading, user, navigate]);

  return (
    <div className="container register-container d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h1 className="mb-2">Register & Make Your "To-Do List"</h1>
        <form onSubmit={submitHandler} className="form w-100">
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Username"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${handlePasswordError()}`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="text-danger">{errorText}</p>}
          <button  type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
