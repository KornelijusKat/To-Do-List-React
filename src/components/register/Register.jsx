import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
} from "../../services/AuthServices";
import "./_register.scss";
import * as authError from "../../helpers/authError"

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [user, loading] = useAuthState(auth); 
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (userData.password !== confirmPassword) {
      setErrorMessage("Passwords do not match!")
      return;
    }
    try{
      setErrorMessage("");
      let result = await registerWithEmailAndPassword(
        userData.name,
        userData.email,
        userData.password
      );
    }catch(err){
      setErrorMessage(authError.firebaseAuthErrors[err.code] || "Something's wrong")
      console.log(err.code)
    }
  };
  const handleError = () =>{
    if(errorMessage)return "border-danger";
 return ""
 }
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/projects");
  }, [loading, user, navigate]);
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
              className={`form-control ${handleError()}`}
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
              className={`form-control ${handleError()}`}
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${handleError()}`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button  type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
