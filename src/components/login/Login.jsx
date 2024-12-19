import HeaderImage from "../../assets/icons/girlSitting.png";
import HeaderCup from "../../assets/icons/cup.png";
import HeaderClock from "../../assets/icons/stopwatch.png";
import HeaderVase from "../../assets/icons/vase.png";
import MusicPlayer from "../../assets/icons/musicPlayer.png";
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
    <div className="container login">
      <div className="login__header">
        <img className="login__header-image" src={HeaderImage} alt="" />
        <img className="login__header-clock" src={HeaderClock} alt="" />
        <img className="login__header-cup" src={HeaderCup} alt="" />
        <img className="login__header-vase" src={HeaderVase} alt="" />
        <img className="login__header-player" src={MusicPlayer} alt="" />
      </div>
      <form className="login__form" onSubmit={submitHandler}>
        <h1 className="login__form-logo">Task Management & To-Do List</h1>
        <input
          className="col-12 col-lg-8"
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={userData.email}
        />
        <input
          className="col-12 col-lg-8"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit" className="col-12 col-lg-8">
          Login
        </button>
        <a href="">Sign up</a>
      </form>
    </div>
  );
};

export default Login;
