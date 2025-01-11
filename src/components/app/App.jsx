import "bootstrap/dist/css/bootstrap.min.css";
import AuthLayout from "../authLayout/AuthLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projects from "../projects/Projects";
import AddProject from "../addProject/AddProject";
import Login from "../login/Login";
import Register from "../register/Register";
import AddTask from "../addTask/AddTask";
import ProjectView from "../projectView/ProjectView";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/projects" element={<Projects />} />
          <Route path="/projectview/:id" element={<ProjectView />} />
          <Route path="/addproject" element={<AddProject />} />
          <Route
            path="/updateproject/:id"
            element={<AddProject></AddProject>}
          ></Route>
          <Route
            path="/projects/:id/addtask"
            element={<AddTask></AddTask>}
          ></Route>
          <Route
            path="/project/:id/updatetask/:taskId"
            element={<AddTask></AddTask>}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
