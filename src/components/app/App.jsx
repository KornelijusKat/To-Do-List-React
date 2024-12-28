import "bootstrap/dist/css/bootstrap.min.css";
import AuthLayout from "../authLayout/AuthLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projects from "../projects/Projects";
import AddProject from "../addProject/AddProject";

function App() {
  return (
    <>
      <Router>
   
          <Routes>
            <Route path="/" element={<AuthLayout/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path='/addproject' element={<AddProject/>}/>
          </Routes>
      
      </Router>
    </>
  );
}

export default App;
