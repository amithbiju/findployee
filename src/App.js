import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AddEmp from "./Pages/AddEmp";
import Dashboard from "./Pages/dashboard";
import CreateTeam from "./Pages/createTeam";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addemp" element={<AddEmp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createteam" element={<CreateTeam  />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
