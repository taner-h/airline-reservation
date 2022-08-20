import "./App.css";
import NavBar from "./components/NavBar";
import DashboardNavBar from "./components/DashboardNavBar";
import Dashboard from "./components/Dashboard";
import Flights from "./components/Flights";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "./components/Homepage";

function App() {
  const [isAdmin, setIsAdmin] = React.useState(true);

  return (
    <div className="App">
      <Router>
        {/*{isAdmin ? <DashboardNavBar /> : <NavBar />}*/}
        <Routes>
          <Route
            path="/admin"
            element={<Dashboard isAdmin={isAdmin}/>}
          />
          <Route
            path="/"
            element={<Homepage isAdmin={isAdmin}/>}
          />
          <Route
            path="/admin/flights"
            element={<Flights isAdmin={isAdmin}/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
