import { useGlobalContext } from "../../context/Context";
import Login from "../login/Login";
import Register from "../register/Register";
import "./_authLayout.scss";
import statisticsImage from "../../assets/img/statistics.png";
import calendarImage from "../../assets/img/calendar.png";
import clockImage from "../../assets/img/clock.png";
import coffeeImage from "../../assets/img/coffee.png";
import filesImage from "../../assets/img/files.png";
import flowersImage from "../../assets/img/flowers.png";
import personImage from "../../assets/img/person.png";

const AuthLayout = () => {
  const { state, dispatch } = useGlobalContext();
  const toggleAuthView = () => {
    dispatch({ type: "TOGGLE_AUTH_VIEW" });
  };
  return (
    <div className="authlayout">
      <div className="image-container mt-5 d-flex align-items-center justify-content-center">
        <img
          src={statisticsImage}
          alt="Statistics"
          className="image statistics"
        />
        <img src={calendarImage} alt="Calendar" className="image calendar" />
        <img src={clockImage} alt="Clock" className="image clock" />
        <img src={coffeeImage} alt="Coffee" className="image coffee" />
        <img src={filesImage} alt="Files" className="image files" />
        <img src={flowersImage} alt="Flowers" className="image flowers" />
        <img src={personImage} alt="Person" className="person image" />
      </div>
      <div className="auth-form-container">
        {state.isLogin ? <Login /> : <Register />}
        <p className="toggle-auth">
          {state.isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button onClick={toggleAuthView} className="toggle-button">
            {state.isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};
export default AuthLayout;
