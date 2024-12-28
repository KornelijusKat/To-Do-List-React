import "bootstrap/dist/css/bootstrap.min.css";
import AuthLayout from "../authLayout/AuthLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projects from "../projects/Projects";

function App() {
  return (
    <>
      <Router>
        <header>
          <Routes>
            <Route path="/" element={<AuthLayout/>}/>
            <Route path="/projects" element={<Projects/>}/>
          </Routes>
        </header>
      </Router>
    </>
  );
}

export default App;
