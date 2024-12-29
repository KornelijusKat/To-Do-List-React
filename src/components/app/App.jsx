import "bootstrap/dist/css/bootstrap.min.css";
import AuthLayout from "../authLayout/AuthLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projects from "../projects/Projects";
import AddProject from "../addProject/AddProject";
import Login from "../login/Login";
import Register from "../register/Register";

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/projects" element={<Projects/>}/>
            <Route path='/addproject' element={<AddProject/>}/>
            <Route path='/updateproject/:id' element={<AddProject></AddProject>}></Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
