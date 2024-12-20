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
  const [error, setError] = useState(""); // Error handling
  const [user, loading] = useAuthState(auth); // Firebase auth
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (userData.password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    registerWithEmailAndPassword(
      userData.name,
      userData.email,
      userData.password
    );
  };

  // useEffect(() => {
  //   if (loading) return;
  //   if (user) navigate("/works");
  // }, [loading, user, navigate]);

  return (
    <div className="register-container d-flex align-items-center justify-content-center">
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
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
