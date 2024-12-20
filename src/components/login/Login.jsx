import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithEmailPassword } from "../../services/AuthServices";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [user, loading, error] = useAuthState(auth);
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (loading) return;
    // if(user) navigate("/works")
    if (user) console.log("Veikia!");
  }, [loading, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userData);
    signInWithEmailPassword(userData.email, userData.password);
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h1 className="mb-3">Task Management & To-Do List</h1>
        <form onSubmit={submitHandler} className="form w-100">
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
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
              className="form-control"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-1">
            Login
          </button>
          <button className="btn btn-secondary w-100">
            <a href="">Sign up</a>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
